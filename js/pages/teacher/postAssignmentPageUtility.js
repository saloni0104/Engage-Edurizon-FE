const token = localStorage.getItem("token");

const fileInput = document.getElementById("teacher-post-assign");

fileInput.onchange = (e) => {
  const selectedFile = fileInput.files[0];
  if (selectedFile) {
    document.getElementById("ques-file-upload-btn").value = "1 File Selected";
  } else {
    e.preventDefault();
    Swal.fire({
      icon: "info",
      title: "Oops...",
      text: "You cannot select more than 1 file!",
    });
  }
};

//Get list of courses in the dropdown
const selectCourse = document.getElementById("coursesList");

fetch("https://edurizon.herokuapp.com/courses/getAllotedCourses", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  },
})
  .then((res) => {
    return res.json();
  })

  .then((res) => {
    let resArray = res.courses;
    for (let course of resArray) {
      let dropdownOption = document.createElement("option");
      let text = document.createTextNode(course.COURSE_ID);
      dropdownOption.appendChild(text);
      dropdownOption.value = course.COURSE_ID;
      selectCourse.appendChild(dropdownOption);
    }
  })

  .catch((err) => {
  });

//Integrate Post assignment route
function resetInputValues() {
  document.getElementById("assign-ques-title").value = "";
  document.getElementById("coursesList").value = "";
  document.getElementById("assignment-deadline").value = "";
  document.getElementById("ques-file-upload-btn").value = "Choose file";
}

document
  .getElementById("teacher-assign-post-btn")
  .addEventListener("click", () => {
    const selectCourse = document.getElementById("coursesList").value;
    const quesTitle = document.getElementById("assign-ques-title").value;
    const assignDeadline = document.getElementById("assignment-deadline").value;
    const quesUploadFile = document.getElementById(
      "ques-file-upload-btn"
    ).value;

    let status = [];

    if (selectCourse.length <= 1) {
      document.getElementById("coursesList").style.borderColor = "red";
      status.push("false");
    } else {
      status.push("true");
    }

    if (quesTitle.length < 1) {
      document.getElementById("assign-ques-title").style.borderColor = "red";
      document.getElementById("assign-ques-title").value = "";
      document.getElementById("ques-title-label").innerHTML =
        "Please enter valid question";
      status.push("false");
    } else {
      status.push("true");
    }

    if (assignDeadline.length < 1) {
      document.getElementById("assignment-deadline").style.borderColor = "red";
      document.getElementById("assignment-deadline").value = "";
      document.getElementById("assign-deadline-label").innerHTML =
        "Please enter the deadline";
      status.push("false");
    } else {
      status.push("true");
    }

    if (status.includes("false")) {
      return false;
    } else {
      let formData = new FormData();
      let input = document.getElementById("teacher-post-assign");
      if (!input.files.length) {
        Swal.fire({
          icon: "error",
          title: "No file chosen",
          text: "Please select a file to upload",
        });
        return;
      }
      formData.append("file", input.files[0], input.files[0].name);
      formData.append("courseId", selectCourse);
      formData.append("assignmentTitle", quesTitle);
      formData.append("assignmentDeadline", assignDeadline.toString());

      document.getElementById("teacher-assign-post-btn").innerText =
        "Please wait...";

      fetch("https://edurizon.herokuapp.com/assignments/addAssignment", {
        method: "POST",
        headers: new Headers({
          Authorization: token,
        }),
        body: formData,
      })
        .then(function (response) {
          return response.json();
        })

        .then((res) => {
          if (res.message) {
            fetchPostedAssignments();
            Swal.fire({
              icon: "success",
              title: "Yayyy",
              text: "Your assignment has been successfully posted!",
            });
            document.getElementById("teacher-assign-post-btn").innerText =
              "Post Assignment";
            resetInputValues();
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: "There was an error posting the assignment. Please try again!",
            });
          }
        })

        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text: "There was an error posting the assignment. Please try again!",
          });
          document.getElementById("teacher-assign-post-btn").innerText =
            "Post Assignment";
        });
    }
  });

//View Posted Assignments

const fetchPostedAssignments = () => {
  fetch("https://edurizon.herokuapp.com/assignments/teacher/allAssignments", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })

    .then((res) => {
      let output = "";
      let order = 0;

      res.teacherCourses.forEach((card, index) => {
        if (card.ASSIGNMENT_POSTED_ON) {
          let courseId = card.COURSE_ID;
          let courseName = card.COURSE_NAME;
          let assignmentPostedOn =
            card.ASSIGNMENT_POSTED_ON &&
            moment(card.ASSIGNMENT_POSTED_ON).format("ll");
          let assignmentDeadline =
            card.ASSIGNMENT_DEADLINE &&
            moment(card.ASSIGNMENT_DEADLINE).format("ll");
          let assignmentQuestionLink = card.ASSIGNMENT_QUESTION_LINK;

          order = order + 1;
          output =
            output +
            `
                <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${courseId}</td>
                    <td>${courseName}</td>
                    <td>${assignmentPostedOn}</td>
                    <td>${assignmentDeadline}</td>
                    <td>
                        <a href="${assignmentQuestionLink}" target="_blank">
                            <i class="fas fa-link"></i>
                        </a>
                    </td>
                </tr>
            `;
        }
      });

      document.getElementById("posted-assignments-details").innerHTML = output;
    })

    .catch((err) => {
    });
};

fetchPostedAssignments();
