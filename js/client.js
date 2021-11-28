import {
  initUI,
  addVideoNode,
  addParticipantNode,
  removeParticipantNode,
  addScreenShareNode,
  removeScreenShareNode,
  removeVideoNode,
  addParticipantCard,
  removeParticipantCard,
} from "./ui.js";


//Initialising Stream Connection
const main = async () => {
  const token = window.localStorage.getItem("token");
  const { studentId, teacherId, name } = JSON.parse(
    Buffer.from(token?.split(".")[1], "base64")?.toString()
  );
  VoxeetSDK.initialize(process.env.CONSUMER_KEY, process.env.CONSUMER_SECRET);
  try {
    await VoxeetSDK.session.open({
      name,
      ...(studentId && { studentId }),
      ...(teacherId && { teacherId }),
    });
    initUI({ name, studentId, teacherId });
  } catch (e) {
    if (e.Name === "SessionError") {
      initUI({ name, studentId, teacherId });
    } else {
      console.log("Some error at our end:", { e });
    }
  }

  // streamadded event is transmitted ot all the participants, when someone joins with audio and video enabled
  VoxeetSDK.conference.on("streamAdded", (participant, stream) => {
    if (stream.type === "ScreenShare") return addScreenShareNode(stream);

    if (stream.getVideoTracks().length) {
      addVideoNode(participant, stream);
    }
    addParticipantNode(participant);
    addParticipantCard(participant);
  });

  //Updates Stream
  VoxeetSDK.conference.on("streamUpdated", (participant, stream) => {
    if (stream.type === "ScreenShare") return;

    if (stream.getVideoTracks().length) {
      addVideoNode(participant, stream);
    } else {
      removeVideoNode(participant);
    }
  });

  //Removes Stream
  VoxeetSDK.conference.on("streamRemoved", (participant, stream) => {
    if (stream.type === "ScreenShare") return removeScreenShareNode();
    removeVideoNode(participant);
    removeParticipantNode(participant);
    removeParticipantCard(participant);
  });
};

main();
