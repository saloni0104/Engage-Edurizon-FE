//Function to get all assignments posted by teachers as pending or submitted

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
  courseAssignments.forEach((assignment) => {
    if (
      completedAssignments.indexOf(assignment.value?.COURSE_ID) !== -1 &&
      assignment.value?.ASSIGNMENT_QUESTION_LINK
    ) {
      // find in studentSubmussionStatus with courseID
      const studentSubmission = studentSubmissionStatus.find(
        (course) => course.COURSE_ID === assignment.value?.COURSE_ID
      );
      completedAssignmentsDOM += makeCard({
        courseId: assignment.value.COURSE_ID,
        courseName: assignment.value.COURSE_NAME,
        assignmentTitle: assignment.value.ASSIGNMENT_TITLE,
        assignmentLink: assignment.value.ASSIGNMENT_QUESTION_LINK,
        answerScriptLink: studentSubmission.ASSIGNMENT_SUBMISSION_LINK,
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

  //Move assignments to submitted from pending, after successful submission
  document.getElementById("pending-assignments").innerHTML =
    pendingAssignmentsDOM
      ? pendingAssignmentsDOM
      : "<div style='font-size:20px; color:#00564d; padding-bottom:50px; text-align:center; font-weight:bolder'>No Pending Assignments</div>";
  document.getElementById("submitted-assignments").innerHTML =
    completedAssignmentsDOM
      ? completedAssignmentsDOM
      : "<div style='font-size:20px; color:#00564d; padding-bottom:50px; text-align:center; font-weight:bolder'>No Submitted Assignments</div>";
};

//Generate Assignments with details dynamically
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
                    ${answerScriptLink
      ? `<h6 style="margin-top:20px;">My Submission <a href=${answerScriptLink} target="_blank"><i class="fas fa-link"></i></a></h6>`
      : ``
    }
                </div>
            </div>
            <div class="col-12 col-md-5" >
                <div class="card-body">
                    <h5 style="font-size:18px">Due on : ${deadline}</h5>
                    <div class="justify-content-center mt-2 px-2">
                    ${moment(new Date()).diff(moment(deadline), "days", true) <= 1
      ? `
                      <input type="file" style="display: none;" id="assign-upload" />
                      <input type="button" id="assign-upload-btn" value="Choose file" style="width: 60%;"
                      onclick="document.getElementById('assign-upload').click();" />
                      <input onclick=fileUploadHandler(event) data-courseId=${courseId} onclick=submitButtonHandler(event)
                       data-courseId=${courseId} class="btn" type="button" value="Submit"
                       id="submit-btn" style="color: white; width: 60%; border-color: #00564d;" />`
      : !answerScriptLink ? `<div style="color: red">Deadline has passed </div>` : ``
    }
                    </div>
                </div>
            </div>
        </div>
    </div>`;
};

//For uploading files

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

  //Submitting Assignment Fetch Call

  event.target.value = "Loading...";
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
      if (response.message) {
        Swal.fire({
          icon: "success",
          title: "Yayy",
          text: "Your assignment has been submitted successfully!",
        });
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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "It's not you, it's us! Please try again after a while.",
      });
    })
    .finally(() => {
      event.target.value = "Submit";
    });
};

getAssignments();
