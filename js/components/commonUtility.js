const logout = () => {
  localStorage.removeItem("token");
  console.log("logout");
  window.location.href = "https://localhost:5500";
};

const noteSaveHandler = () => {
  var notes = document.getElementById("notes")?.innerHTML;
  let status = [];

  if (notes?.length <= 1) {
    status.push("false");
  } else {
    status.push("true");
  }

  if (status.includes("false")) {
    console.log("There was some error while validating");
    return false;
  } else {
    console.log("Validated");

    fetch("https://edurizon.herokuapp.com/notes/saveNotes", {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
        Authorization: `${token}`,
      }),
      body: JSON.stringify({
        notes: notes,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

function openForm() {
  document.getElementById("myForm").style.display = "block";

  let token = localStorage.getItem("token");
  fetch("https://edurizon.herokuapp.com/notes/getNotes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      if (response.message) {
        document.getElementById("notes").innerHTML = response.notes;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

const checkIfLoggedIn = () => {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
};

!checkIfLoggedIn() && (window.location.href = "https://localhost:5500");

const noteFocusHandler = () => {
  noteSaveHandler();
};
