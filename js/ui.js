export const initUI = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const meetingId = urlParams.get("meetingId");
  const courseName = urlParams.get("courseName");
  const courseId = urlParams.get("courseId");
  const nameMessage = document.getElementById("name-message");
  nameMessage.innerHTML = `You have now joined ${courseId}: ${courseName}`;
  const leaveButton = document.getElementById("leave-btn");

  // video
  const videoBtn = document.getElementById("video-btn");
  const camBtn = document.getElementById("video-icon");

  //audio
  const audioBtn = document.getElementById("audioBtn");
  const mikeBtn = document.getElementById("mic-icon");

  // screen sharing
  const screenShareBtn = document.getElementById("screenshare-btn");
  const shareIcon = document.getElementById("screen-share-icon");

  //enter conference
  VoxeetSDK.conference
    .create({ alias: meetingId })
    .then((conference) => VoxeetSDK.conference.join(conference, {}))
    .then(() => {
      leaveButton.disabled = false;
      camBtn.setAttribute("class", "fas fa-video-slash");
      mikeBtn.setAttribute("class", "fas fa-microphone-slash");
      screenShareBtn.style.backgroundColor = "white";
      shareIcon.style.color = "teal";
      addParticipantNode(VoxeetSDK.session.participant);
    })
    .catch((err) => {
    })

  //leave conference
  leaveButton.onclick = () => {
    VoxeetSDK.conference
      .leave()
      .then(() => {
        leaveButton.disabled = true;
        screenShareBtn.style.backgroundColor = "white";
        shareIcon.style.color = "teal";
        mikeBtn.setAttribute("class", "fas fa-microphone-slash");
        camBtn.setAttribute("class", "fas fa-video-slash");
        window.location.href = `https://edurizon.netlify.app/courseDetailsPage.html?courseId=${courseId}`;
      })
      .catch((err) => {
      })
  };

  // video btn handlers
  videoBtn.onclick = () => {
    //turn cam on
    if (camBtn.getAttribute("class") === "fas fa-video-slash") {
      VoxeetSDK.conference
        .startVideo(VoxeetSDK.session.participant)
        .then(() => {
          camBtn.setAttribute("class", "fas fa-video");
        })
        .catch((err) => {
        })
    }
    //Turn cam off
    else if (camBtn.getAttribute("class") === "fas fa-video") {
      VoxeetSDK.conference
        .stopVideo(VoxeetSDK.session.participant)
        .then(() => {
          camBtn.setAttribute("class", "fas fa-video-slash");
        })
        .catch((err) => {
        })
    }
  };

  // screen share btn handlers
  screenShareBtn.onclick = () => {
    //On
    if (screenShareBtn.style.backgroundColor === "white") {
      VoxeetSDK.conference
        .startScreenShare()
        .then(() => {
          screenShareBtn.style.backgroundColor = "teal";
          shareIcon.style.color = "white";

        })
        .catch((err) => {
        })
    }
    //Off
    else if (screenShareBtn.style.backgroundColor === "teal") {
      VoxeetSDK.conference
        .stopScreenShare()
        .then(() => {
          screenShareBtn.style.backgroundColor = "white";
          shareIcon.style.color = "teal";

        })
        .catch((err) => {
        })

    }
  };

  // mic btn handlers
  audioBtn.onclick = () => {

    if (mikeBtn.getAttribute("class") === "fas fa-microphone-slash") {
      VoxeetSDK.conference.mute(VoxeetSDK.session.participant, false);    //no mute
      mikeBtn.setAttribute("class", "fas fa-microphone");
    } else if (mikeBtn.getAttribute("class") === "fas fa-microphone") {
      VoxeetSDK.conference.mute(VoxeetSDK.session.participant, true);    //mute
      mikeBtn.setAttribute("class", "fas fa-microphone-slash");
    }
  };
};

// For creation of video node
export const addVideoNode = (participant, stream) => {
  const targetParticipantCard = document.getElementById(
    "participantCard-" + participant.id
  );


  if (targetParticipantCard) {
    targetParticipantCard.removeChild(targetParticipantCard.firstChild);
    let videoNode = document.getElementById("video-" + participant.id);
    if (!videoNode) {
      videoNode = document.createElement("video");
      videoNode.setAttribute("id", "video-" + participant.id);
      videoNode.setAttribute("playsinline", true);
      videoNode.muted = true;
      videoNode.setAttribute("autoplay", "autoplay");
      videoNode.setAttribute("class", "video-boxes");
      targetParticipantCard.style.backgroundColor = "white";
      targetParticipantCard.appendChild(videoNode);
    }
    navigator.attachMediaStream(videoNode, stream);
  }
};

export const removeVideoNode = (participant) => {
  let videoNode = document.getElementById("video-" + participant.id);

  if (videoNode) {
    videoNode.srcObject = null; // Prevent memory leak in Chrome
    videoNode.parentNode.removeChild(videoNode);
    addParticipantCard(participant);
  }
};

export const addParticipantNode = (participant) => {
  if (document.getElementById("participant-" + participant.id)) {
    return;
  }
  const participantsList = document.getElementById("participants-list");

  // if the participant is the current session user, don’t add them to the list
  // if (participant.id === VoxeetSDK.session.participant.id) return;

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

//Add Participant Card
export const addParticipantCard = (participant) => {
  const targetParticipantCard = document.getElementById(
    "participantCard-" + participant.id
  );
  if (!targetParticipantCard) {
    const div = document.createElement("div");
    div.setAttribute("class", "participant-card");
    div.setAttribute("id", `participantCard-${participant.id}`);
    const circleDiv = document.createElement("div");
    circleDiv.setAttribute("class", "participantCard-circle");
    circleDiv.setAttribute(
      "style",
      `background-image: url('https://ui-avatars.com/api/?name=${participant.info.name}&background=008679&color=fff')`
    );
    div.appendChild(circleDiv);
    document.getElementById("video-container").appendChild(div);
  } else {
    const circleDiv = document.createElement("div");
    circleDiv.setAttribute("class", "participantCard-circle");
    circleDiv.setAttribute(
      "style",
      `background-image: url('https://ui-avatars.com/api/?name=${participant.info.name}&background=008679&color=fff')`
    );
    targetParticipantCard.style.backgroundColor = "black";
    targetParticipantCard.appendChild(circleDiv);
  }
};

//Remove Participant Card
export const removeParticipantCard = (participant) => {
  let participantCardNode = document.getElementById(
    "participantCard" + participant.id
  );

  if (participantCardNode) {
    participantCardNode.parentNode.removeChild(participantCardNode);
  }
};
