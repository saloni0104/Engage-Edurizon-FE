document.getElementById("preloader").style.display = "block";

window.onload = function () {
  document.getElementById("preloader").style.display = "none";
  //Signup as a teacher
  document
    .getElementById("signup-button")
    .addEventListener("click", function (e) {
      var id = document.getElementById("instid").value;

      //Empty Field Validation
      let status = [];

      if (id.length <= 1) {
        document.getElementById("instid").value = "";
        document.getElementById("instid").placeholder = "Please enter valid ID";
        status.push("false");
      } else {
        status.push("true");
      }

      if (status.includes("false")) {
        return false;
      } else {
        document.getElementById("signup-button").value = "Loading...";
        if (document.getElementById("teacher-radio").checked == true) {
          fetch("https://edurizon.herokuapp.com/auth/generatePassword", {
            method: "POST",
            headers: new Headers({ "content-type": "application/json" }),
            body: JSON.stringify({
              teacherId: id,
            }),
          })
            .then((response) => {
              return response.json();
            })
            .then((response) => {
              if (
                response.message == "Password reset link sent to your email"
              ) {
                document.getElementById("signup-button").value = "Signup";
                Swal.fire({
                  icon: "success",
                  title: "Yayy",
                  text: "Check you mail for the Password!",
                });
                setTimeout(() => {
                  window.location.href = "setPasswordPage.html";
                }, 1500);
              } else if (response.message == "Failed to send email try again") {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Failed to send email try again.",
                });
                document.getElementById("signup-button").value = "Signup";
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "It's not you, it's us! Please try again after a while.",
                });
                document.getElementById("signup-button").value = "Signup";
              }
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "It's not you, it's us! Please try again after a while.",
              });
            })
            .finally(() => {
              document.getElementById("signup-button").value = "Signup";
            });
        }
      }
    });

  //Signup as a student
  document
    .getElementById("signup-button")
    .addEventListener("click", function (e) {
      var id = document.getElementById("instid").value;

      //Empty Field Validation
      let status = [];

      if (id.length <= 1) {
        document.getElementById("instid").value = "";
        document.getElementById("instid").placeholder = "Please enter valid ID";
        status.push("false");
      } else {
        status.push("true");
      }

      if (status.includes("false")) {
        return false;
      } else {
        document.getElementById("signup-button").value = "Loading...";
        if (document.getElementById("student-radio").checked == true) {
          fetch("https://edurizon.herokuapp.com/auth/generatePassword", {
            method: "POST",
            headers: new Headers({ "content-type": "application/json" }),
            body: JSON.stringify({
              studentId: id,
            }),
          })
            .then((response) => {
              return response.json();
            })
            .then((response) => {
              if (
                response.message == "Password reset link sent to your email"
              ) {
                document.getElementById("signup-button").value = "Signup";
                Swal.fire({
                  icon: "success",
                  title: "Yayy",
                  text: "Check you mail for the Password!",
                });
                setTimeout(() => {
                  window.location.href = "setPasswordPage.html";
                }, 1500);
              } else if (response.message == "Failed to send email try again") {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Failed to send email try again.",
                });
                document.getElementById("signup-button").value = "Signup";
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "It's not you, it's us! Please try again after a while.",
                });
                document.getElementById("signup-button").value = "Signup";
              }
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "It's not you, it's us! Please try again after a while.",
              });
            })
            .finally(() => {
              document.getElementById("signup-button").value = "Signup";
            });
        }
      }
    });
};
