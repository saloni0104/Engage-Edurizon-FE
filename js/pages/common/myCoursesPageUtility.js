function redirectToCourseDetailsPage(event) {
  const courseId = event.currentTarget.getAttribute("data-courseId");
  window.location.href = `https://edurizon.netlify.app/courseDetailsPage.html?courseId=${courseId}`;
}

//Get Allocated Courses and redirect to Course Details Page on click


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
  .then((response) => {
    if (response) {
      let output = "";
      let order = 0;
      response.courses.forEach((card) => {
        let course_id = card.COURSE_ID;
        let course_name = card.COURSE_NAME;
        order = order + 1;
        output =
          output +
          `<div class="col-12 col-md-4">
              <div class="card" data-courseId=${course_id} onclick=redirectToCourseDetailsPage(event) style="height: 270px; cursor: pointer">
                  <div class="card-header">
                      <h5 class="card-category">${course_id}</h5>
                      <h4 class="card-title">${course_name}</h4>  
                  </div>
              </div>
          </div>`;
      });

      document.getElementById("course-card").innerHTML = output;
    }
  })
  .catch((err) => {
  });
