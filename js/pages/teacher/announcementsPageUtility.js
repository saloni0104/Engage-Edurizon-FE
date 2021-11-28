
//Fetch Calls for Posting Message and Schedules by the Teacher

let token = localStorage.getItem("token");

//Post Message Fetch Request
document
  .getElementById("post-mess-btn")
  .addEventListener("click", function (e) {

    //Empty Field Validation
    var mess_course_id = document.getElementById("mess_course_id").value;
    var message = document.getElementById("message").value;

    let status = [];

    if (mess_course_id.length <= 1) {
      document.getElementById("mess_course_id").value = "";
      document.getElementById("mess_course_id").placeholder =
        "Please enter valid Course ID";
      status.push("false");
    } else {
      status.push("true");
    }

    if (message.length <= 1) {
      document.getElementById("message").value = "";
      document.getElementById("message").placeholder =
        "Please enter valid Message";
      status.push("false");
    } else {
      status.push("true");
    }

    if (status.includes("false")) {
      return false;
    } else {
      document.getElementById("post-mess-btn").value = "Loading...";
      fetch(
        "https://edurizon.herokuapp.com/facultyUtility/postMessageOrSchedule",
        {
          method: "POST",
          headers: new Headers({
            "content-type": "application/json",
            Authorization: `${token}`,
          }),
          body: JSON.stringify({
            courseId: mess_course_id,
            message: message,
          }),
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if (response.message) {
            document.getElementById("post-mess-btn").value =
              "Post Announcement";
            Swal.fire({
              icon: "success",
              title: "Yayy",
              text: "Successfully Posted!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Please try again",
            });
            document.getElementById("post-mess-btn").value =
              "Post Announcement";
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "It's not you, it's us! Please try again after a while.",
          });
          document.getElementById("post-mess-btn").value =
            "Post Announcement";
        });
    }
  });

//Post Schedule Fetch Request 

document
  .getElementById("post-sched-btn")
  .addEventListener("click", function (e) {

    //Empty Field Validation
    var sched_course_id = document.getElementById("sched_course_id").value;
    var schedule = document.getElementById("schedule").value;

    let status = [];

    if (sched_course_id.length <= 1) {
      document.getElementById("sched_course_id").value = "";
      document.getElementById("sched_course_id").placeholder =
        "Please enter valid Course ID";
      status.push("false");
    } else {
      status.push("true");
    }

    if (schedule.length <= 1) {
      document.getElementById("schedule").value = "";
      document.getElementById("schedule").placeholder =
        "Please enter valid schedule";
      status.push("false");
    } else {
      status.push("true");
    }

    if (status.includes("false")) {
      return false;
    } else {
      document.getElementById("post-sched-btn").value = "Loading...";
      fetch(
        "https://edurizon.herokuapp.com/facultyUtility/postMessageOrSchedule",
        {
          method: "POST",
          headers: new Headers({
            "content-type": "application/json",
            Authorization: `${token}`,
          }),
          body: JSON.stringify({
            courseId: sched_course_id,
            schedule: schedule,
          }),
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if (response.message) {
            document.getElementById("post-sched-btn").value =
              "Post Announcement";
            Swal.fire({
              icon: "success",
              title: "Yayy",
              text: "Successfully Posted!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Please try again",
            });
            document.getElementById("post-sched-btn").value =
              "Post Announcement";
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "It's not you, it's us! Please try again after a while.",
          });
          document.getElementById("post-sched-btn").value =
            "Post Announcement";
        });
    }
  });
