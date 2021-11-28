document.getElementById("preloader").style.display = "block";

window.onload = function () {
  document.getElementById("preloader").style.display = "none";

  document
    .getElementById("setpwd-button")
    .addEventListener("click", function (e) {
      var pwd = document.getElementById("set-pwd").value;
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      const isTeacher = urlParams.get("isTeacher");

      //Empty Field Validation
      let status = [];

      if (pwd.length <= 1) {
        document.getElementById("set-pwd").value = "";
        document.getElementById("set-pwd").placeholder =
          "Please enter valid password";
        status.push("false");
      } else {
        status.push("true");
      }

      if (status.includes("false")) {
        return false;
      } else {
        document.getElementById("setpwd-button").value = "Loading...";

        //Fetch Call to Set Password
        fetch("https://edurizon.herokuapp.com/auth/setPassword", {
          method: "POST",
          headers: new Headers({ "content-type": "application/json" }),
          body: JSON.stringify({
            password: pwd,
            passwordGenerationToken: token,
            isTeacher: isTeacher === "true",
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            if (response.message == "Password updated successfully") {
              document.getElementById("setpwd-button").value =
                "Set my password";
              Swal.fire({
                icon: "success",
                title: "Yayy",
                text: "Your password has been set successfully!",
              });
              setTimeout(() => {
                window.location.href = "login.html";
              }, 1500);
            } else if (response.message == "Failed to send email try again") {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to set your password",
              });
              document.getElementById("setpwd-button").value =
                "Set my password";
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
            document.getElementById("setpwd-button").value = "Set my password";
          });
      }
    });
};
