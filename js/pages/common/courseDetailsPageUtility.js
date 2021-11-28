import { TopNavbar } from "../../components/topNavbar.js";

const loadCourseDetails = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get("courseId");
  getCourseDetailsAndPopulateUI(courseId);
};

//Get Latest Announcements
const getLatestAnnouncement = (courseId, courses) => {
  let course = courses.find((course) => course.COURSE_ID === courseId);

  var mess_date =
    course.COURSE_FACULTY_MESSAGE_POSTED_ON &&
    moment(course.COURSE_FACULTY_MESSAGE_POSTED_ON).format("MMM Do YY");
  var sched_date =
    course.COURSE_SCHEDULE_POSTED_ON &&
    moment(course.COURSE_SCHEDULE_POSTED_ON).format("MMM Do YY");

  return [
    course.COURSE_SCHEDULE,
    course.COURSE_FACULTY_MESSAGE,
    mess_date,
    sched_date,
  ];
};

const getLatestAnnouncementStudent = (courseId, courseMessages) => {
  let courseMessage = courseMessages.find(
    (courseMessage) => courseMessage?.value?.COURSE_ID === courseId
  );

  var mess_date =
    courseMessage.value.COURSE_FACULTY_MESSAGE_POSTED_ON &&
    moment(courseMessage.value.COURSE_FACULTY_MESSAGE_POSTED_ON).format(
      "MMM Do YY"
    );
  var sched_date =
    courseMessage.value.COURSE_SCHEDULE_POSTED_ON &&
    moment(courseMessage.value.COURSE_SCHEDULE_POSTED_ON).format("MMM Do YY");

  return [
    courseMessage.value.COURSE_SCHEDULE,
    courseMessage.value.COURSE_FACULTY_MESSAGE,
    mess_date,
    sched_date,
  ];
};

//Get all Course Details for a particular course
const getCourseDetailsAndPopulateUI = (courseId) => {
  let token = localStorage.getItem("token");
  const isTeacher =
    localStorage.getItem("identifier")?.charAt(0)?.toLowerCase() === "t";
  const { name } = JSON.parse(
    Buffer.from(token?.split(".")[1], "base64")?.toString()
  );
  fetch(
    `https://edurizon.herokuapp.com/courses/getCourseDetails?courseId=${courseId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response) {
        document.getElementById("top-navbar").innerHTML = TopNavbar({
          title: response.courseDetails.COURSE_NAME,
          courseId: response.courseDetails.COURSE_ID,
          name,
        });
        if (response.courseDetailsOfStudent) {
          //class teacher details
          document.getElementById("teacher-id").innerHTML =
            response.courseDetailsOfStudent.TEACHER_ID;
          document.getElementById("teacher-name").innerHTML =
            response.courseDetailsOfStudent.TEACHER_NAME;
        } else {
          document.getElementById("teacher-id").innerHTML =
            localStorage.getItem("identifier");
          document.getElementById("teacher-name").innerHTML =
            localStorage.getItem("name");
        }

        // class student details
        let output = "";
        let order = 0;
        window.localStorage.setItem("ENROLLED_STUDENTS", JSON.stringify(
          response.courseDetails.ENROLLED_STUDENTS
        ))

        response.courseDetails.ENROLLED_STUDENTS.forEach((card, index) => {
          let student_id = card.STUDENT_ID;
          let student_name = card.NAME;
          order = order + 1;
          output =
            output +
            `<tr style="text-align: center;">
            <th scope="row">${index + 1}</th>
            <td>${student_id}</td>
            <td>${student_name}</td>
            ${isTeacher
              ? `<td>
                <button data-courseid=${courseId} data-studentid=${student_id} class="btn student-remove-btn">
                    <i class="fas fa-minus-circle"></i>
                </button>
              </td>`
              : ``
            }
            
            </tr>
                `;
        });
        !isTeacher && document.getElementById("th-remove-student").remove();

        //Class Joining Meeting Link
        document
          .getElementById("join-meeting-link")
          .setAttribute(
            "href",
            `https://edurizon.netlify.app/meetingPage.html?meetingId=${response.courseDetails.MEETING_ID}&courseId=${courseId}&courseName=${response.courseDetails.COURSE_NAME}`
          );
        document.getElementById("student-details").innerHTML = output;
        const allRemoveStudentBtns = document.getElementsByClassName(
          "btn student-remove-btn"
        );
        for (let i = 0; i < allRemoveStudentBtns.length; i++) {
          allRemoveStudentBtns[i].addEventListener("click", (e) => {
            deleteStudent(e);
          });
        }
      }
    })
    .catch((err) => {
    });

  //Fetch Course Messages and Schedules
  fetch(`https://edurizon.herokuapp.com/courses/getAllotedCourses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.courseMessages) {
        document.getElementById("view-message").innerHTML =
          getLatestAnnouncementStudent(courseId, response.courseMessages)[1] ||
          "No new Messages";
        document.getElementById("view-schedule").innerHTML =
          getLatestAnnouncementStudent(courseId, response.courseMessages)[0] ||
          "No new Schedules";
        document.getElementById("view-message-date").innerHTML =
          getLatestAnnouncementStudent(courseId, response.courseMessages)[2] ||
          "-";
        document.getElementById("view-schedule-date").innerHTML =
          getLatestAnnouncementStudent(courseId, response.courseMessages)[3] ||
          "-";
      } else {
        document.getElementById("view-message").innerHTML =
          getLatestAnnouncement(courseId, response.courses)[1] ||
          "No new Messages";
        document.getElementById("view-schedule").innerHTML =
          getLatestAnnouncement(courseId, response.courses)[0] ||
          "No new Schedules";
        document.getElementById("view-message-date").innerHTML =
          getLatestAnnouncement(courseId, response.courses)[2] || "-";
        document.getElementById("view-schedule-date").innerHTML =
          getLatestAnnouncement(courseId, response.courses)[3] || "-";
      }
    })
    .catch((err) => {
    });
};

loadCourseDetails();


//Remove Student from Course
const deleteStudent = (event) => {
  const courseId = event.currentTarget.getAttribute("data-courseid");
  const studentId = event.currentTarget.getAttribute("data-studentid");
  Swal.fire({
    icon: "warning",
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    showCancelButton: true,
    confirmButtonColor: "#00665c",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, remove the student!",
  }).then((result) => {
    if (result.isConfirmed) {
      const token = localStorage.getItem("token");
      fetch("https://edurizon.herokuapp.com/courses/removeStudentFromCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          courseId,
          studentId,
        }),
      })
        .then((res) => {
          return res.json();
        })

        .then((res) => {
          getCourseDetailsAndPopulateUI(courseId);
          Swal.fire(
            "Deleted!",
            "Student has been deleted from the course.",
            "success"
          );
        });
    }
  });
};


//Add Student to Course
const identifier = localStorage.getItem("identifier");
if (identifier?.toLowerCase().charAt(0) === "t") {
  document.getElementById("add-student-to-course").style.display = "block";
} else {
  document.getElementById("add-student-to-course").style.display = "none";
}

document.getElementById("add-student-submit-btn").addEventListener("click", () => {
  const token = localStorage.getItem("token");
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get("courseId");
  let studentId = document.getElementById("student-id").value;

  if (studentId.length < 1) {
    document.getElementById("student-id").style.borderColor = "red";
    document.getElementById("student-id").value = "";
    document.getElementById("student-id-label").innerHTML =
      "Please enter student id";
  } else {
    const enrolledStudents = JSON.parse(localStorage.getItem("ENROLLED_STUDENTS"));
    if (!enrolledStudents.some((student) => student.STUDENT_ID === studentId)) {
      document.getElementById("add-student-submit-btn").innerText =
        "Please wait...";
      fetch("https://edurizon.herokuapp.com/courses/addStudentToCourse", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
        body: JSON.stringify({
          courseId: courseId,
          studentId: studentId
        }),
      })

        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            Swal.fire({
              icon: "success",
              title: "Yayyy",
              text: "Student added to course successfully!",
            });
            document.getElementsByClassName("close")[0].click();
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: "There was an error. Please try again!",
            });
          }
        })

        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text: "There was an error. Please try again!",
          });

        })

        .finally(() => {
          document.getElementById("add-student-submit-btn").innerText =
            "Add Student";
        })
    } else {
      Swal.fire({
        icon: "info",
        text: "This student already exists!",
      });
    }
  }
})
