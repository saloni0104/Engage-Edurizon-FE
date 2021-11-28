
const token = localStorage.getItem("token");

//Post Question Fetch Call
document.getElementById("modal-btn").addEventListener("click", () => {
  var ques = document.getElementById("postQuest").value;
  var desc = document.getElementById("postDesc").value;

  let status = [];
  if (ques.length < 1) {
    document.getElementById("postQuest").style.borderColor = "#001614";
    document.getElementById("postQuest").value = "";
    document.getElementById("postQuest").placeholder =
      "Please type your question";
    status.push("false");
  } else {
    status.push("true");
  }

  if (desc.length < 1) {
    document.getElementById("postDesc").style.borderColor = "#001614";
    document.getElementById("postDesc").value = "";
    document.getElementById("postDesc").placeholder =
      "Please type your question description";
    status.push("false");
  } else {
    status.push("true");
  }

  if (status.includes("false")) {
    return false;
  } else {
    document.getElementById("modal-btn").value = "Please Wait...";
    fetch("https://edurizon.herokuapp.com/QandA/add/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        title: document.getElementById("postQuest").value,
        description: document.getElementById("postDesc").value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.errorMessage) {
          Swal.fire({
            icon: "warning",
            title: "Oops",
            text: "Please don't use bad sentiments",
          });
        } else {

          Swal.fire({
            icon: "success",
            title: "Yayy",
            text: "Your question has been successfully posted!",
          });
          document.getElementById("post-ques-close").click();
        }
      })
      .catch((err) => {

        Swal.fire({
          icon: "error",
          title: "Oopss..",
          text: "There was some error while posting your question. Please try again!",
        });
      })
      .finally(() => {
        document.getElementById("modal-btn").value = "Post";
      });
  }
});

// get the question according to search
document.getElementById("quesSearch").addEventListener("input", (event) => {
  const query = event.target.value;

  fetch("https://edurizon.herokuapp.com/QandA/search?q=" + query)
    .then((res) => res.json())
    .then((res) => {
      const questions = res.message;
      let content = "";
      for (let i = 0; i < questions.length; i++) {
        if (questions[i].QUESTION_TITLE.toLowerCase() !== "test question") {
          content =
            content +
            `<div class=" row justify-content-center mt-5">
              <div class="col-lg-6 col-12 mb-5">
                  <div class="card question-card mt-3 pb-5">
                      <div class="card-header bg-white text-center border-0 ">
                          <div class="row justify-content-center ">
                            <div class="col"> <img class="align-self-center text-center outside img-fluid"
                                      style="border-radius: 50px;" src="https://ui-avatars.com/api/?name=${questions[i].AUTHOR_NAME}" width="100"
                                      height="100">
                              </div>
                          </div>
                          <div class="row text-center name">
                              <div class="col">
                                  <h5 class="mb-0 profile-pic font-weight-bold mt-1" style="color:#00635a ;">
                                      ${questions[i].AUTHOR_NAME}</h5>
                                      <span>${questions[i].AUTHOR_ID}</span>
                              </div>
                          </div>
                      </div>
                      <div class="card-body pt-0 text-center pb-2 mt-3 ">
                          <div class="row justify-content-center">
                              <div class="col-md-12 col">
                                  <p class="bold"> <span><img class="img-fluid quotes"
                                              src="https://res.cloudinary.com/dix59xs8i/image/upload/v1637871445/start-quote_iuvoae.png" width="40"
                                              height="40"></span>${questions[i].QUESTION_TITLE}
                                      <span><img class="img-fluid quotes-down"
                                              src="https://res.cloudinary.com/dix59xs8i/image/upload/v1637871393/end-quote_miq4gl.png" width="40" height="40">
                                      </span>
                                  </p>
                                  <p style="font-size: 22px;">${questions[i].QUESTION_DESCRIPTION}</p>
                              </div>
                          </div>
                          <div class="col-12" style="text-align: center;">
                              <button id="answer-btn" class="btn" data-toggle="modal" data-target=#${questions[i].QUESTION_ID} >Post Answer</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>`;
        }

        generateModal(questions[i].QUESTION_ID);

        // add answer script too
        if (questions[i].QUESTION_TITLE.toLowerCase() !== "test question") {
          for (let j = 0; j < questions[i].ANSWERS.length; j++) {
            content =
              content +
              `<div class=" row justify-content-center" style="margin-top:-80px">
                                  <div class="col-lg-6 col-12 mb-5">
                                      <div class="card answer-card mt-3 pb-3">
                                          <div class="card-header bg-white text-center border-0 ">
                                              <div class="row justify-content-center ">
                                                  <div class="col"> <img class="align-self-center text-center outside img-fluid"
                                                        style="border-radius: 50px;" src="https://ui-avatars.com/api/?name=${questions[i].ANSWERS[j].ANSWER_AUTHOR_NAME}" width="100"
                                                        height="100">
                                                  </div>
                                              </div>
                                              <div class="row text-center name">
                                                  <div class="col">
                                                      <h5 class="mb-0 profile-pic font-weight-bold mt-1" style="color:#001614; margin-top: 10px;">
                                                          ${questions[i].ANSWERS[j].ANSWER_AUTHOR_NAME}</h5>
                                                      <h6 class="mt-3">${questions[i].ANSWERS[j].ANSWER_AUTHOR_ID}</h6>
                                                  </div>
                                              </div>
                                          </div>
                                          <div class="card-body pt-0 text-center pb-1 mt-2 ">
                                              <div class="row justify-content-center">
                                                  <div class="col-md-12 col">
                                                      <p style="font-size: 22px; text-align: justify;">${questions[i].ANSWERS[j].ANSWER_DESCRIPTION}</p>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>`;
          }
        }

      }
      document.getElementById("askdesk-content").innerHTML = content;
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oopss..",
        text: "Fetching failed. Contact admin!",
      });
    });
});

// update function for btn and top opener id

function generateModal(customId) {
  document.getElementById("fake-modal-container").insertAdjacentHTML(
    "beforeend",
    `<div class="modal fade" id=${customId} tabindex="-1" role="dialog" aria-labelledby="answerModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
  <div class="modal-content">
  <div class="modal-header">
    <h5 class="modal-title" id="answerModalLabel">Post Your Answer</h5>
    <button type="button" class="close" data-dismiss="modal" id="post-ans-modal-close" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
      <textarea id=${customId}postDesc style="width : 100%; min-height : 100px; border:2px solid #00564d" placeholder="Post Answer"
      title="Post Answer"></textarea>
  </div>
  <div class="modal-footer text-center">
    <button data-questionId=${customId} type="button" style="background-image: linear-gradient(to right, #000000, #00897b); color: white" class="btn" id="answer-modal-btn" onclick="postAnswer(event)">Post</button>
  </div>
  </div>
  </div>
  </div>`
  );
}

//Post Answer field validation and fetch call

function postAnswer(event) {
  const questionId = event.target.getAttribute("data-questionId");

  var postAns = document.getElementById(`${questionId}postDesc`).value;
  let status = [];
  if (postAns.length < 1) {
    document.getElementById(`${questionId}postDesc`).style.borderColor =
      "#001614";
    document.getElementById(`${questionId}postDesc`).value = "";
    document.getElementById(`${questionId}postDesc`).placeholder =
      "Please type your answer";
    status.push("false");
  } else {
    status.push("true");
  }

  if (status.includes("false")) {
    return false;
  }
  //fetch call
  else {
    document.getElementById("answer-modal-btn").value = "Please Wait...";

    document.getElementById("answer-btn").value = "Posting...";

    document.getElementById("answer-modal-btn").value = "Please Wait...";
    fetch("https://edurizon.herokuapp.com/QandA/add/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        questionId,
        answer: document.getElementById(`${questionId}postDesc`).value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.errorMessage) {
          Swal.fire({
            icon: "warning",
            title: "Oops",
            text: "Please don't use bad sentiments",
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Yayy",
            text: "Your answer has been successfully posted!",
          });
          document.getElementById("post-ans-modal-close").click();
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oopss..",
          text: "There was some error while posting your answer. Please try again!",
        });
      })
      .finally(() => {
        document.getElementById("answer-modal-btn").value = "Post";
      });
  }
}
