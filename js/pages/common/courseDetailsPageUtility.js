// Utility functions
import { TopNavbar } from "../../components/topNavbar.js";

const loadCourseDetails = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get("courseId");
  getCourseDetailsAndPopulateUI(courseId);
};

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
    (courseMessage) => courseMessage.value.COURSE_ID === courseId
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

const getCourseDetailsAndPopulateUI = (courseId) => {
  let token = localStorage.getItem("token");
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
      console.log("details");
      console.log(response);
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
            response.courseDetails.TEACHER_ID;
        }

        // class student details
        let output = "";
        let order = 0;
        response.courseDetails.ENROLLED_STUDENTS.forEach((card, index) => {
          let student_id = card.STUDENT_ID;
          let student_name = card.NAME;
          order = order + 1;
          output =
            output +
            `<tr>
            <th scope="row">${index + 1}</th>
            <td>${student_id}</td>
            <td>${student_name}</td>
            </tr>
                `;
        });
        document
          .getElementById("join-meeting-link")
          .setAttribute(
            "href",
            `https://localhost:5500/meetingPage.html?meetingId=${response.courseDetails.MEETING_ID}&courseId=${courseId}&courseName=${response.courseDetails.COURSE_NAME}`
          );
        // document
        //   .getElementById("join-meeting-link")
        //   .setAttribute(
        //     "href",
        //     `https://edurizon.netlify.app/meetingPage.html?meetingId=${response.courseDetails.MEETING_ID}&courseId=${courseId}&courseName=${response.courseDetails.COURSE_NAME}`
        //   );
        document.getElementById("student-details").innerHTML = output;
      }
    })
    .catch((err) => {
      console.log(err);
    });

  //Get peers

  fetch(
    `https://edurizon.herokuapp.com/courses/getPeers?courseId=${courseId}`,
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
        console.log(response);
        // class student details
        let output = "";
        let order = 0;
        response.students.forEach((card, index) => {
          let student_id = card.STUDENT_ID;
          let student_name = card.NAME;
          order = order + 1;
          output =
            output +
            `<tr>
              <th scope="row">${index + 1}</th>
              <td>${student_id}</td>
              <td>${student_name}</td>
              <td></td>
              </tr>
                  `;
        });
        document.getElementById("student-details").innerHTML = output;
      }
    })
    .catch((err) => {
      console.log(err);
    });

  //Get Message/ Schedule

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
        console.log("get alloted");
        console.log(response);
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
        console.log("get alloted");
        console.log(response);
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
      console.log(err);
    });
};

loadCourseDetails();
