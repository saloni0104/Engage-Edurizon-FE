let token = localStorage.getItem("token");

//Get list of courses in the dropdown (course id)
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
    console.log(err);
  });

// update office hours
function resetInputValues() {
  document.getElementById("coursesList").value = "";
  document.getElementById("weekList").value = "";
  document.getElementById("start-time").value = "";
  document.getElementById("end-time").value = "";
}

document
  .getElementById("office-hour-submit-btn")
  .addEventListener("click", () => {
    const selectCourse = document.getElementById("coursesList").value;
    const selectweekday = document.getElementById("weekList").value;
    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;
    console.log({ selectCourse, selectweekday, startTime, endTime });

    let status = [];

    if (selectCourse.length <= 1) {
      document.getElementById("coursesList").style.borderColor = "red";
      status.push("false");
    } else {
      status.push("true");
    }

    if (selectweekday.length <= 1) {
      document.getElementById("weekList").style.borderColor = "red";
      status.push("false");
    } else {
      status.push("true");
    }

    if (startTime.length < 1) {
      document.getElementById("start-time").style.borderColor = "red";
      document.getElementById("start-time").value = "";
      document.getElementById("start-time-label").innerHTML =
        "Please enter the start time";
      status.push("false");
    } else {
      status.push("true");
    }

    if (endTime.length < 1) {
      document.getElementById("end-time").style.borderColor = "red";
      document.getElementById("end-time").value = "";
      document.getElementById("end-time-label").innerHTML =
        "Please enter the end time";
      status.push("false");
    } else {
      status.push("true");
    }

    if (status.includes("false")) {
      return false;
    } else {
      document.getElementById("office-hour-submit-btn").innerText =
        "Please wait...";
      fetch("https://edurizon.herokuapp.com/facultyUtility/updateOfficeHour", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
        body: JSON.stringify({
          courseId: selectCourse,
          officeHourDay: selectweekday,
          startTime: startTime,
          endTime: endTime,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            Swal.fire({
              icon: "success",
              title: "Yayyy",
              text: "Your office hour has been successfully updated!",
            });
            document.getElementById("office-hour-submit-btn").innerText =
              "Post Office Hour";
            document.getElementsByClassName("close")[0].click();
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
            text: "There was an error posting the office hour. Please try again!",
          });
          document.getElementById("office-hour-submit-btn").innerText =
            "Post Office Hour";
        });
    }
  });

//my courses
fetch("https://edurizon.herokuapp.com/courses/getAllotedCourses", {
  method: "GET",
  headers: new Headers({
    "content-type": "application/json",
    Authorization: `${token}`,
  }),
})
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    if (response) {
      console.log(response);
      let output = "";
      let order = 0;
      response.courses.forEach((card) => {
        let course_id = card.COURSE_ID;
        let course_name = card.COURSE_NAME;
        order = order + 1;
        output =
          output +
          `<div class="col-12 col-md-4" style="cursor: pointer">
              <div class="card teacher" data-courseId=${course_id} style="height: 270px;">
                  <div class="card-header">
                      <h5 class="card-category">${course_id}</h5>
                      <h4 class="card-title" style="font-size:20px">${course_name}</h4>  
                  </div>
                  <div class ="card-body text-center mt-5">
                  <h6><i class="fas fa-circle mr-2" style="color:green"></i>Faculty Status : Available</h6>
                  
                  <div class="text-center mt-4 p-3" style="border-bottom-left-radius:15px;border-bottom-right-radius:15px;background-color:#B2D8D8; border-top: solid 2px teal;
                  color:#00564d;">
                  <span style="font-size:20px"><a href=https://localhost:5500/meetingPage.html?meetingId=${card.OFFICE_HOUR_MEETING_ID}&courseId=${course_id}&courseName=${course_name} >Enter Meet</a></span>
                  </div>
                  </div>
              </div>
          </div>`;
      });

      document.getElementById("course-card").innerHTML = output;
    }
  })
  .catch((err) => {
    console.log(err);
  });
