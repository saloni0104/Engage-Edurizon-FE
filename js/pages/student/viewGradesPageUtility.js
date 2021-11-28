let token = localStorage.getItem("token");

//Get Assignment Scores for all assignments submitted on Student View
fetch(
  `https://edurizon.herokuapp.com/assignments/student/allAssignments`,
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

      let output = "";
      let order = 0;
      response.studentCourses.forEach((card, index) => {
        let course_id = card.COURSE_ID;
        let course_name = card.COURSE_NAME;
        let marks = card.ASSIGNMENT_SCORE || "Not assigned";
        let link = card.ASSIGNMENT_SUBMISSION_LINK;
        order = order + 1;
        output =
          output +
          `<tr>
            <th scope="row">${index + 1}</th>
            <td>${course_id}</td>
            <td>${course_name}</td>
            <td>${marks}</td>
            <td>${card.ASSIGNMENT_SCORE ? `<a target="_blank" href="${link}"><i class="fas fa-link"></i></a>` : `-`}</td>
            </tr>
                `;
      });

      document.getElementById("grade-details").innerHTML = output;
    }
  })
  .catch((err) => {
  });