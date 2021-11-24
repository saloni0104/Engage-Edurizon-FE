// ui.js
export const initUI = ({ name, studentId, teacherId }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const meetingId = urlParams.get("meetingId");
  const courseName = urlParams.get("courseName");
  const courseId = urlParams.get("courseId");
  const nameMessage = document.getElementById("name-message");
  nameMessage.innerHTML = `You have now joined ${courseId}: ${courseName}`;
  const leaveButton = document.getElementById("leave-btn");

  // video call
  const videoBtn = document.getElementById("video-btn");

  const audioBtn = document.getElementById("audioBtn");

  // screen sharing
  const screenShareBtn = document.getElementById("screenshare-btn");

  VoxeetSDK.conference
    .create({ alias: meetingId })
    .then((conference) => VoxeetSDK.conference.join(conference, {}))
    .then(() => {
      leaveButton.disabled = false;
      videoBtn.style.backgroundColor = "grey";
      audioBtn.style.backgroundColor = "grey";
      screenShareBtn.style.backgroundColor = "grey";
    })
    .catch((err) => console.error(err));

  leaveButton.onclick = () => {
    VoxeetSDK.conference
      .leave()
      .then(() => {
        leaveButton.disabled = true;
        screenShareBtn.style.backgroundColor = "grey";
        audioBtn.style.backgroundColor = "grey";
        videoBtn.style.backgroundColor = "grey";
      })
      .catch((err) => console.error(err));
  };

  // video btn handlers
  videoBtn.onclick = () => {
    //turn cam on
    if (videoBtn.style.backgroundColor === "grey") {
      VoxeetSDK.conference
        .startVideo(VoxeetSDK.session.participant)
        .then(() => {
          videoBtn.style.backgroundColor = "green";
        })
        .catch((err) => console.error(err));
    }
    //Turn cam off
    else if (videoBtn.style.backgroundColor === "green") {
      VoxeetSDK.conference
        .stopVideo(VoxeetSDK.session.participant)
        .then(() => {
          videoBtn.style.backgroundColor = "grey";
        })
        .catch((err) => console.error(err));
    }
  };

  // screen share btn handlers
  screenShareBtn.onclick = () => {
    if (screenShareBtn.style.backgroundColor === "grey") {
      VoxeetSDK.conference
        .startScreenShare()
        .then(() => {
          screenShareBtn.style.backgroundColor = "blue";
        })
        .catch((err) => console.error(err));
    } else if (screenShareBtn.style.backgroundColor === "blue") {
      VoxeetSDK.conference
        .stopScreenShare()
        .then(() => {
          screenShareBtn.style.backgroundColor = "grey";
        })
        .catch((err) => console.error(err));
    }
  };

  // mic btn handlers
  audioBtn.onclick = () => {
    if (audioBtn.style.backgroundColor === "grey") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(function (stream) {
          console.log("You let me use your mic!");
          audioBtn.style.backgroundColor = "orange";
        })
        .catch(function (err) {
          console.log({ err });
          console.log("No mic for you!");
        });
    } else if (audioBtn.style.backgroundColor === "orange") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => {
          console.log("Mic stopped!");
          audioBtn.style.backgroundColor = "grey";
        })
        .catch(function (err) {
          console.log({ err });
          console.log("No mic for you!");
        });
    }
  };
};

// For creation of video node
export const addVideoNode = (participant, stream) => {
  let videoNode = document.getElementById("video-" + participant.id);
  if (!videoNode) {
    videoNode = document.createElement("video");
    videoNode.setAttribute("id", "video-" + participant.id);
    videoNode.setAttribute("playsinline", true);
    videoNode.muted = true;
    videoNode.setAttribute("autoplay", "autoplay");
    videoNode.setAttribute("class", "video-boxes");
    const videoContainer = document.getElementById("video-container");
    if (!stream) {
      videoNode.setAttribute(
        "style",
        "height: 200px; width: 33%; background:transparent url('https://i.pinimg.com/736x/8a/76/96/8a7696cb9ac02d0ea26945a8e563b04b--camera-icon-flat-icons.jpg') no-repeat 0 0;"
      );
    }
    videoContainer.appendChild(videoNode);
  }
  stream && navigator.attachMediaStream(videoNode, stream);
};

export const removeVideoNode = (participant) => {
  let videoNode = document.getElementById("video-" + participant.id);

  if (videoNode) {
    videoNode.srcObject = null; // Prevent memory leak in Chrome
    videoNode.parentNode.removeChild(videoNode);
  }
};

export const addParticipantNode = (participant) => {
  console.log({ participant });
  const participantsList = document.getElementById("participants-list");

  // if the participant is the current session user, don’t add them to the list
  if (participant.id === VoxeetSDK.session.participant.id) return;

  let participantNode = document.createElement("li");
  participantNode.setAttribute("id", "participant-" + participant.id);
  participantNode.innerText = `${participant.info.name}`;

  participantsList.appendChild(participantNode);
};

export const removeParticipantNode = (participant) => {
  let participantNode = document.getElementById(
    "participant-" + participant.id
  );

  if (participantNode) {
    participantNode.parentNode.removeChild(participantNode);
  }
};

// node addition for screen sharing
export const addScreenShareNode = (stream) => {
  const screenShareContainer = document.getElementById("screenshare-container");
  let screenShareNode = document.getElementById("screenshare");

  if (screenShareNode) {
    return alert("There is already a participant sharing their screen!");
  }
  screenShareNode = document.createElement("video");
  screenShareNode.setAttribute("id", "screenshare");
  screenShareNode.autoplay = "autoplay";
  navigator.attachMediaStream(screenShareNode, stream);

  screenShareContainer.appendChild(screenShareNode);
};

export const removeScreenShareNode = () => {
  let screenShareNode = document.getElementById("screenshare");

  if (screenShareNode) {
    screenShareNode.srcObject = null; // Prevent memory leak in Chrome
    screenShareNode.parentNode.removeChild(screenShareNode);
  }
};
