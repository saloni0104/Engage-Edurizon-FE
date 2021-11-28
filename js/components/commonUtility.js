// Logout Function
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  localStorage.removeItem("identifier");
  window.location.href = "https://edurizon.netlify.app";
};

//Auto saving notes function
const noteSaveHandler = () => {
  var notes = document.getElementById("notes")?.innerHTML;
  const token = localStorage.getItem("token");
  let status = [];

  if (notes?.length <= 1) {
    status.push("false");
  } else {
    status.push("true");
  }

  if (status.includes("false")) {
    return false;
  } else {
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
      })
      .catch((err) => {
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
      if (response.message) {
        document.getElementById("notes").innerHTML = response.notes;
      }
    })
    .catch((err) => {
    });
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

//checked if logged in function
const checkIfLoggedIn = () => {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
};

!checkIfLoggedIn() && (window.location.href = "https://edurizon.netlify.app");

const noteFocusHandler = () => {
  noteSaveHandler();
};
