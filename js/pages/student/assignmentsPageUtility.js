const getAssignments = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `https://edurizon.herokuapp.com/assignments/student/allAssignments`,
    {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${token}`,
      }),
    }
  );
  const data = await response.json();
  populateUI(data);
};

const populateUI = (assignments) => {
  const studentSubmissionStatus = assignments.studentCourses;
  const courseAssignments = assignments.course;
  const completedAssignments = [];
  let pendingAssignmentsDOM = "";
  let completedAssignmentsDOM = "";
  studentSubmissionStatus.forEach((course) => {
    if (course.ASSIGNMENT_SUBMISSION_LINK) {
      completedAssignments.push(course.COURSE_ID);
    }
  });
  console.log(completedAssignments);
  courseAssignments.forEach((assignment) => {
    if (
      completedAssignments.indexOf(assignment.value?.COURSE_ID) !== -1 &&
      assignment.value?.ASSIGNMENT_QUESTION_LINK
    ) {
      completedAssignmentsDOM += makeCard({
        courseId: assignment.value.COURSE_ID,
        courseName: assignment.value.COURSE_NAME,
        assignmentTitle: assignment.value.ASSIGNMENT_TITLE,
        assignmentLink: assignment.value.ASSIGNMENT_QUESTION_LINK,
        answerScriptLink: assignment.value.ASSIGNMENT_SUBMISSION_LINK,
        deadline: assignment.value.ASSIGNMENT_DEADLINE,
      });
    } else if (assignment.value?.ASSIGNMENT_QUESTION_LINK) {
      pendingAssignmentsDOM += makeCard({
        courseId: assignment.value.COURSE_ID,
        courseName: assignment.value.COURSE_NAME,
        assignmentTitle: assignment.value.ASSIGNMENT_TITLE,
        assignmentLink: assignment.value.ASSIGNMENT_QUESTION_LINK,
        deadline: assignment.value.ASSIGNMENT_DEADLINE,
      });
    }
  });
  document.getElementById("pending-assignments").innerHTML =
    pendingAssignmentsDOM;
  document.getElementById("submitted-assignments").innerHTML =
    completedAssignmentsDOM;
};

const makeCard = ({
  courseId,
  courseName,
  assignmentTitle,
  assignmentLink,
  answerScriptLink,
  deadline,
}) => {
  return `
    <div class="card col-12 col-md-10 offset-md-1 mb-5" style="border: 3px solid #00564d; box-shadow: 5px 10px #888888;">
        <div class="row">
            <div class="col-12 col-md-7" >
                <div class="card-header">
                    <h5 class="card-category">${courseId}: ${courseName}</h5>
                    <b>
                        <h4 class="card-title; color:#00564d">${assignmentTitle}</h4>
                    </b>
                </div>
                <div class="card-body">
                    <h6>Question <a href=${assignmentLink} target="_blank"><i class="fas fa-link"></i></a></h6>
                    <h6 style="margin-top:20px;">My Submission <a href=${answerScriptLink} target="_blank"><i class="fas fa-link"></i></a></h6>
                </div>
            </div>
            <div class="col-12 col-md-5" >
                <div class="card-body">
                    <h5 style="font-size:18px">Due on : ${deadline}</h5>
                    <div class="justify-content-center mt-2 px-2">
                      <input type="file" style="display: none;" id="assign-upload" />
                      <input type="button" id="assign-upload-btn" value="Choose file" style="width: 60%;"
                      onclick="document.getElementById('assign-upload').click();" />
                      <input onclick=fileUploadHandler(event) data-courseId=${courseId} onclick=submitButtonHandler(event) data-courseId=${courseId} class="btn" type="button" value="Submit"
                       id="submit-btn" style="color: white; width: 60%; border-color: #00564d;" />
                    </div>
                </div>
            </div>
        </div>
    </div>`;
};

const fileUploadHandler = (event) => {
  let formData = new FormData();
  let input = document.getElementById("assign-upload");
  if (!input.files.length) {
    Swal.fire({
      icon: "error",
      title: "No file chosen",
      text: "Please select a file to upload",
    });
    return;
  }
  document.getElementById("assign-upload-btn").value = "Loading...";
  formData.append("file", input.files[0], input.files[0].name);
  formData.append(
    "courseId",
    event.currentTarget.getAttribute("data-courseId")
  );
  fetch("https://edurizon.herokuapp.com/assignments/submitAssignment", {
    method: "POST",
    headers: new Headers({
      Authorization: window.localStorage.getItem("token"),
    }),
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      if (response.message) {
        getAssignments();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to upload your assignment",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "It's not you, it's us! Please try again after a while.",
      });
    })
    .finally(() => {
      document.getElementById("assign-upload-btn").value = "Choose file";
    });
};

getAssignments();
