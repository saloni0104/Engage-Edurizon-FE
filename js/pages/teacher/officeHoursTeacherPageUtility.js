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
  });

// Post office hours
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

//Get Course Cabins for which Faculty has posted Office Hours
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
      response.courses.forEach((card) => {
        if (card.OFFICE_HOUR_DAY) {
          let course_id = card.COURSE_ID;
          let course_name = card.COURSE_NAME;
          let start = card.OFFICE_HOUR_START_TIME;
          let end = card.OFFICE_HOUR_END_TIME;
          let day = card.OFFICE_HOUR_DAY;
          const parentDiv = document.createElement("div");
          parentDiv.setAttribute("class", "col-12 col-md-4");
          const cardDiv = document.createElement("div");
          cardDiv.setAttribute("class", "card teacher");
          cardDiv.setAttribute("style", "height: 270px;");
          cardDiv.setAttribute("data-courseId", course_id);
          const cardNewDiv = document.createElement("div");
          const cardHeaderDiv = document.createElement("div");
          cardHeaderDiv.setAttribute("class", "card-header");
          const cardCategoryH5 = document.createElement("h5");
          cardCategoryH5.setAttribute("class", "card-category");
          const cardCategoryTextNode = document.createTextNode(course_id);
          cardCategoryH5.appendChild(cardCategoryTextNode);
          cardHeaderDiv.appendChild(cardCategoryH5);
          const cardTitleH4 = document.createElement("h4");
          cardTitleH4.setAttribute("class", "card-title");
          const cardTitleTextNode = document.createTextNode(course_name);
          cardTitleH4.setAttribute("style", "font-size: 20px");
          cardTitleH4.appendChild(cardTitleTextNode);
          const cardDay = document.createTextNode(day + " - ");
          const cardStart = document.createTextNode(start + " to ");
          const cardEnd = document.createTextNode(end);
          const cardTitleH6 = document.createElement("h6");
          cardTitleH6.setAttribute("style", "padding-left:16px; font-size: 16px; margin:5px");
          cardTitleH6.appendChild(cardDay);
          cardTitleH6.appendChild(cardStart);
          cardTitleH6.appendChild(cardEnd);
          cardNewDiv.appendChild(cardTitleH6);
          cardHeaderDiv.appendChild(cardTitleH4);
          cardDiv.appendChild(cardHeaderDiv);
          cardDiv.appendChild(cardNewDiv);
          const cardBodyDiv = document.createElement("div");
          cardBodyDiv.setAttribute("class", "card-body text-center mt-3");
          const h6 = document.createElement("h6");
          const i = document.createElement("i");
          i.setAttribute("class", "fas fa-circle mr-2");
          h6.appendChild(i);
          cardBodyDiv.appendChild(h6);
          const textCenterDiv = document.createElement("div");
          textCenterDiv.setAttribute("class", "text-center mt-4 p-3");
          textCenterDiv.setAttribute(
            "style",
            "border-bottom-left-radius:15px;border-bottom-right-radius:15px;background-color:#B2D8D8; border-top: solid 2px teal;color:#00564d; cursor:pointer"
          );
          const textCenterSpan = document.createElement("span");
          textCenterSpan.setAttribute("style", "font-size: 20px");
          const a = document.createElement("a");
          a.setAttribute(
            "href",
            `https://edurizon.netlify.app/meetingPage.html?meetingId=${card.OFFICE_HOUR_MEETING_ID}&courseId=${course_id}&courseName=${course_name}`
          );
          const aText = document.createTextNode("Enter Meet");
          a.appendChild(aText);
          textCenterSpan.appendChild(a);
          textCenterDiv.appendChild(textCenterSpan);
          cardBodyDiv.appendChild(textCenterDiv);
          cardDiv.appendChild(cardBodyDiv);
          parentDiv.appendChild(cardDiv);
          document.getElementById("course-card").appendChild(parentDiv);
          setInterval(() => {
            const date = new Date();
            const weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";
            let day = weekday[date.getDay()];
            if (day === card?.OFFICE_HOUR_DAY?.trim()) {
              const startHour = Number(
                card.OFFICE_HOUR_START_TIME.split(":")[0]
              );
              const startMinute = Number(
                card.OFFICE_HOUR_START_TIME.split(":")[1]
              );
              const endHour = Number(card.OFFICE_HOUR_END_TIME.split(":")[0]);
              const endMinute = Number(card.OFFICE_HOUR_END_TIME.split(":")[1]);
              const currentHour = date.getHours();
              const currentMinute = date.getMinutes();
              const startMinuteConv = startMinute + startHour * 60;
              const endMinuteConv = endMinute + endHour * 60;
              const currentMinuteConv = currentMinute + currentHour * 60;
              if (
                currentMinuteConv >= startMinuteConv &&
                currentMinuteConv <= endMinuteConv
              ) {
                i.setAttribute("style", "color: green");
                a.setAttribute(
                  "style",
                  "text-decoration: none; pointer-events: auto; cursor: pointer"
                );
              } else {
                i.setAttribute("style", "color: red");
                a.setAttribute(
                  "style",
                  "text-decoration: none; pointer-events: none; cursor: default"
                );
              }
            } else {
              i.setAttribute("style", "color: red");
              a.setAttribute(
                "style",
                "text-decoration: none; pointer-events: none; cursor: default"
              );
            }
          }, 1000);
        }
      });
    }
  })
  .catch((err) => {
  });

