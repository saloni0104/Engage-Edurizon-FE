// Function to make tiled layout

const makeFloor = () => {
  for (let i = 0; i < 156; i++) {
    const div = document.createElement("div");
    div.classList.add("col-1");
    div.classList.add("floor");
    document.getElementById("teachers-bay").appendChild(div);
    div.setAttribute("style", "border: 1px solid #00564d");
  }
};

//Function to make dynamic Course Cabins
const makeClasses = ({
  courseTitle = "",
  officeHourStartTime = "",
  officeHourEndTime = "",
  officeHourDay = "",
  officeHourMeetingLink = "",
  courseId = "",
}) => {
  const div = document.createElement("div");
  div.classList.add("classes");
  div.classList.add("card");

  var text_div = document.createElement("div");
  const text = document.createTextNode(`${courseId} ${courseTitle}`);
  text_div.appendChild(text);
  text_div.setAttribute(
    "style",
    "font-size:13px; text-align:center; font-weight:bolder; margin-top:5px"
  );
  div.appendChild(text_div);

  var time_div = document.createElement("div");
  const time = document.createTextNode(
    `Office Hours : ${officeHourStartTime} - ${officeHourEndTime} on ${officeHourDay}`
  );
  time_div.setAttribute(
    "style",
    "font-size:13px; text-align:center;font-weight:bolder; margin-top:5px;"
  );
  time_div.appendChild(time);
  div.appendChild(time_div);

  //Red and Green Dots to Show Status Availibilty
  const red_dot = document.createElement("i");
  red_dot.classList.add("fas");
  red_dot.classList.add("fa-circle");
  red_dot.setAttribute(
    "style",
    "color: red; size:12px; position: absolute; bottom: 5px; left: 5px; margin-top:8px"
  );
  const green_dot = document.createElement("i");
  green_dot.classList.add("fas");
  green_dot.classList.add("fa-circle");
  green_dot.setAttribute(
    "style",
    "color: green; size:12px; position: absolute; bottom: 5px; left: 5px; margin-top:8px"
  );

  //Sets Availibilty as per Office Hours Posted By Teachers
  div.setAttribute("data-meetingid", officeHourMeetingLink);
  div.setAttribute("data-courseid", courseId);
  div.setAttribute("data-coursetitle", courseTitle);
  document.getElementById("teachers-bay").appendChild(div);
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
    if (day === officeHourDay.trim()) {
      const startHour = Number(officeHourStartTime.split(":")[0]);
      const startMinute = Number(officeHourStartTime.split(":")[1]);
      const endHour = Number(officeHourEndTime.split(":")[0]);
      const endMinute = Number(officeHourEndTime.split(":")[1]);
      const currentHour = date.getHours();
      const currentMinute = date.getMinutes();
      const startMinuteConv = startMinute + startHour * 60;
      const endMinuteConv = endMinute + endHour * 60;
      const currentMinuteConv = currentMinute + currentHour * 60;
      if (
        currentMinuteConv >= startMinuteConv &&
        currentMinuteConv <= endMinuteConv
      ) {
        div.appendChild(green_dot);
      } else {
        div.appendChild(red_dot);
      }
    } else {
      div.appendChild(red_dot);
    }
  }, 1000);

};

//Get all allocated courses list, to generate cabins
let token = localStorage.getItem("token");
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
  .then(({ courseMessages }) => {
    if (courseMessages) {
      courseMessages.forEach((course) => {
        course.value?.COURSE_NAME &&
          makeClasses({
            courseTitle: course?.value?.COURSE_NAME,
            officeHourStartTime: course?.value?.OFFICE_HOUR_START_TIME,
            officeHourEndTime: course?.value?.OFFICE_HOUR_END_TIME,
            officeHourDay: course?.value?.OFFICE_HOUR_DAY,
            officeHourMeetingLink: course?.value?.OFFICE_HOUR_MEETING_ID,
            courseId: course?.value?.COURSE_ID,
          });
      });
    }
    makeFloor();
    document
      .getElementById("box")
      .firstChild.setAttribute(
        "src",
        `https://ui-avatars.com/api/?name=${localStorage.getItem("name")}`
      );
  })
  .catch((err) => {
  });

// Character movement
var pane = $("#teachers-bay"),
  box = $("#box"),
  w = pane.width() - box.width(),
  d = {},
  x = 3;

function newv(v, a, b) {
  var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0);
  return n < 0 ? 0 : n > w ? w : n;
}

//Key Functions for arrow key movement to check position of character 
$(window).keydown(function (e) {
  d[e.which] = true;
});
$(window).keyup(function (e) {
  d[e.which] = false;
  const characterPositionCheck = checkIfInside();
  if (characterPositionCheck[0]) {
    const element = characterPositionCheck[1];
    Swal.fire({
      title: "Are you sure?",
      text: `You are going to join office hours of ${element.getAttribute(
        "data-coursetitle"
      )}`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Join now",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `https://edurizon.netlify.app/meetingPage.html?meetingId=${element.getAttribute(
          "data-meetingid"
        )}&courseId=${element.getAttribute(
          "data-courseid"
        )}&courseName=${element.getAttribute("data-coursetitle")}`;
      }
    });
  } else {
  }
});

window.addEventListener(
  "resize",
  function (event) {
    if (window.innerWidth <= 990) {
      document.getElementById("button-navigation").style.display = "block";
    } else {
      document.getElementById("button-navigation").style.display = "none";
    }
  },
  true
);

//Button movement functions on phone screens

$(document).ready(function () {
  $("#up").click(function () {
    e = $.Event("keydown");
    e.which = 38;
    $("#box").trigger(e);
    setTimeout(() => {
      e = $.Event("keyup");
      e.which = 38;
      $("#box").trigger(e);
    }, 200);
  });
});

$(document).ready(function () {
  $("#down").click(function (e) {
    e = $.Event("keydown");
    e.which = 40;
    $("#box").trigger(e);
    setTimeout(() => {
      e = $.Event("keyup");
      e.which = 40;
      $("#box").trigger(e);
    }, 200);
  });
});

$(document).ready(function () {
  $("#left").click(function (e) {
    e = $.Event("keydown");
    e.which = 37;
    $("#box").trigger(e);
    setTimeout(() => {
      e = $.Event("keyup");
      e.which = 37;
      $("#box").trigger(e);
    }, 200);
  });
});

$(document).ready(function () {
  $("#right").click(function (e) {
    e = $.Event("keydown");
    e.which = 39;
    $("#box").trigger(e);
    setTimeout(() => {
      e = $.Event("keyup");
      e.which = 39;
      $("#box").trigger(e);
    }, 200);
  });
});

setInterval(function () {
  box.css({
    left: function (i, v) {
      return newv(v, 37, 39);
    },
    top: function (i, v) {
      return newv(v, 38, 40);
    },
  });
}, 20);

// Code to check the position of the character, if its inside cabin or not
const getCoordinates = () => {
  const mover = document.querySelector("#box");
  const rect = mover.getBoundingClientRect();
  return {
    top: rect.top + window.pageYOffset,
    bottom: rect.bottom + window.pageYOffset,
    left: rect.left + window.pageXOffset,
    right: rect.right + window.pageXOffset,
  };
};

const getCoordinatesOfClasses = () => {
  const classes = document.querySelectorAll(".classes");
  const coordinates = [];
  classes.forEach(function (element) {
    const rect = element.getBoundingClientRect();
    const top = rect.top + window.pageYOffset;
    const bottom = rect.bottom + window.pageYOffset;
    const left = rect.left + window.pageXOffset;
    const right = rect.right + window.pageXOffset;
    coordinates.push({
      top,
      bottom,
      left,
      right,
      element,
    });
  });
  return coordinates;
};

const checkIfInside = () => {
  const character = getCoordinates();
  const classes = getCoordinatesOfClasses();
  let isInside = false;
  let parentClassElement = null;
  classes.forEach(function (element) {
    if (
      character.top > element.top &&
      character.bottom < element.bottom &&
      character.left > element.left &&
      character.right < element.right
    ) {
      isInside = true;
      parentClassElement = element.element;
    }
  });
  return [isInside, parentClassElement];
};
