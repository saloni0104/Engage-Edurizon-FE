window.onload = function () {
  //login as teacher
  document
    .getElementById("login-button")
    .addEventListener("click", function (e) {
      var id = document.getElementById("instid").value;
      var password = document.getElementById("password").value;

      let status = [];

      if (id.length <= 1) {
        document.getElementById("instid").value = "";
        document.getElementById("instid").placeholder = "Please enter valid ID";
        status.push("false");
      } else {
        status.push("true");
      }

      if (password.length <= 1) {
        document.getElementById("password").value = "";
        document.getElementById("password").placeholder =
          "Please enter valid Password";
        status.push("false");
      } else {
        status.push("true");
      }

      if (status.includes("false")) {
        console.log("There was some error while validating");
        return false;
      } else {
        console.log("Validated");
        document.getElementById("login-button").value = "Loading...";
        if(document.getElementById("teacher-radio").checked == true){
            fetch("https://edurizon.herokuapp.com/auth/login", {
            method: "POST",
            headers: new Headers({ "content-type": "application/json" }),
            body: JSON.stringify({
                teacherId: id,
                password: password,
            }),
            })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                console.log(response);
                if (response.token) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("identifier", id);
                document.getElementById("login-button").value =
                    "Login";
                Swal.fire({
                    icon: "success",
                    title: "Yayy",
                    text: "Successfully logged in!",
                });
                setTimeout(() => {
                    window.location.href = "myCoursesPage.html";
                }, 2500);
                } else if (response.message == "Invalid password") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Invalid password.",
                });
                document.getElementById("login-button").value =
                    "Login";
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "It's not you, it's us! Please try again after a while.",
                    });
                    document.getElementById("login-button").value =
                        "Login";
                }
            })
          
            .catch((err) => {
                Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "It's not you, it's us! Please try again after a while.",
                });
                document.getElementById("login-button").value = "Login";
            });
        }
      }
    });


  //Login as Student
  document
    .getElementById("login-button")
    .addEventListener("click", function (e) {
      var id = document.getElementById("instid").value;
      var password = document.getElementById("password").value;

      let status = [];

      if (id.length <= 1) {
        document.getElementById("instid").value = "";
        document.getElementById("instid").placeholder = "Please enter valid ID";
        status.push("false");
      } else {
        status.push("true");
      }

      if (password.length <= 1) {
        document.getElementById("password").value = "";
        document.getElementById("password").placeholder =
          "Please enter valid Password";
        status.push("false");
      } else {
        status.push("true");
      }

      if (status.includes("false")) {
        console.log("There was some error while validating");
        return false;
      } else {
        console.log("Validated");
        document.getElementById("login-button").value = "Loading...";
        if(document.getElementById("student-radio").checked == true){
            fetch("https://edurizon.herokuapp.com/auth/login", {
            method: "POST",
            headers: new Headers({ "content-type": "application/json" }),
            body: JSON.stringify({
                studentId: id,
                password: password,
            }),
            })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                console.log(response);
                if (response.token) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("identifier", id);
                document.getElementById("login-button").value = "Login";
                Swal.fire({
                    icon: "success",
                    title: "Yayy",
                    text: "Successfully logged in!",
                });
                setTimeout(() => {
                    window.location.href = "myCoursesPage.html";
                }, 2500);
                } else if (response.message == "Invalid password") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Invalid password.",
                });
                document.getElementById("login-button").value = "Login";
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "It's not you, it's us! Please try again after a while.",
                    });
                    document.getElementById("login-button").value =
                        "Login";
                }
            })
            .catch((err) => {
                Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "It's not you, it's us! Please try again after a while.",
                });
                document.getElementById("login-button").value = "Login";
            });
        }
      }
    });
};
