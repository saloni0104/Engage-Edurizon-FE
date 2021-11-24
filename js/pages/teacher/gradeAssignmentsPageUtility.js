const token = localStorage.getItem("token");

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


const onChangeHandler = (event) => {
    document.getElementById("before-studentlist").style.display = "none";
    const courseId = event.target.value;
    getStudentsList(courseId);
    document.getElementById("table").style.visibility = "visible";
};

const getStudentsList = (courseId) => {
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
            console.log(response);
            if (response) {
                console.log(response);
                // selected course student details
                let output = "";
                let order = 0;
                response.courseDetails.ENROLLED_STUDENTS.forEach((card, index) => {
                    let student_id = card.STUDENT_ID;
                    let student_name = card.NAME;
                    const student_score = card.ASSIGNMENT_SCORE || 0;
                    order = order + 1;
                    output =
                        output +
                        `
              <tr>
              <th scope="row">${index + 1}</th>
              <td>${student_id}</td>
              <td>${student_name}</td>
              <td>${student_score}</td>
              <td>
                  <button data-studentid=${student_id} onclick=modalOpener(event) class="btn pencil-btn" data-toggle="modal" data-target="#${student_id}">
                    <i class="fas fa-pencil-alt"></i>
                  </button>
              </td>
            </tr>
                  `;
                });

                document.getElementById("student-details").innerHTML = output;
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

const modalOpener = (event) => {
    const studentId = event.currentTarget.getAttribute("data-studentid");
    document.getElementById("modal-holder").innerHTML = generateModal(studentId);
    event.target.click();
};

const postMarks = (event) => {
    const studentId = event.target.getAttribute("data-studentId");
    const score = Number(document.getElementsByClassName("mark-input")[0].value);
    const courseId = document.getElementById("coursesList").value;
    document.getElementsByClassName("btn update-btn-modal")[0].value = "Loading...";
    fetch("https://edurizon.herokuapp.com/assignments/gradeAssignment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        body: JSON.stringify({
            studentId,
            courseId,
            score,
        }),
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log({ response });
            getStudentsList(courseId);
            if (response.message) {
                Swal.fire({
                    icon: "success",
                    title: "Yayy",
                    text: "The marks has been updated successfully!",
                });
                document.getElementById("modal-close-btn").click();
            }
        })
        .catch((err) => {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to update the marks",
            });
        });
};

const generateModal = (studentId) => {
    return `<div class="modal fade" id=${studentId} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add/Update Student's Marks</h5>
                        <button type="button" id="modal-close-btn" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- input to update marks -->
                        <div>
                            <label style="font-size: 20px;">Enter Marks</label><br>
                            <input type="number" placeholder="Marks" class="mark-input" name="marks" step=".01">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button onclick=postMarks(event) data-studentId=${studentId} type="button" class="btn update-btn-modal">Add/Update Marks</button>
                    </div>
                </div>
            </div>
        </div>`;
};


