import {
  initUI,
  addVideoNode,
  addParticipantNode,
  removeParticipantNode,
  addScreenShareNode,
  removeScreenShareNode,
  removeVideoNode,
} from "./ui.js";

const main = () => {
  const token = window.localStorage.getItem("token");
  const { studentId, teacherId, name } = JSON.parse(
    Buffer.from(token?.split(".")[1], "base64")?.toString()
  );
  fetch("https://edurizon.herokuapp.com/calls/getCredentials", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then(async (data) => {
      console.log({ data });
      VoxeetSDK.initialize(data.consumerKey, data.consumerSecret);
      try {
        await VoxeetSDK.session.open({
          name,
          ...(studentId && { studentId }),
          ...(teacherId && { teacherId }),
        });
        initUI({ name, studentId, teacherId });
      } catch (e) {
        console.log({ e });
        if (e.Name === "SessionError") {
          initUI({ name, studentId, teacherId });
        } else {
          console.log("Some error at our end:", { e });
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });

  // streamadded event is transmitted ot all the participants, when someone joins with audio and video enabled
  VoxeetSDK.conference.on("streamAdded", (participant, stream) => {
    console.log("streamAdded", { participant, stream });
    if (stream.type === "ScreenShare") return addScreenShareNode(stream);

    if (stream.getVideoTracks().length) {
      addVideoNode(participant, stream);
      addParticipantNode(participant);
    } else {
      addVideoNode(participant, false);
      addParticipantNode(participant);
    }
  });

  VoxeetSDK.conference.on("streamUpdated", (participant, stream) => {
    console.log("streamUpdated", { participant, stream });
    if (stream.type === "ScreenShare") return;

    if (stream.getVideoTracks().length) {
      addVideoNode(participant, stream);
    } else {
      removeVideoNode(participant);
    }
  });

  VoxeetSDK.conference.on("streamRemoved", (participant, stream) => {
    console.log("streamRemoved", { participant, stream });
    if (stream.type === "ScreenShare") return removeScreenShareNode();
    removeVideoNode(participant);
    removeParticipantNode(participant);
  });
};

main();
