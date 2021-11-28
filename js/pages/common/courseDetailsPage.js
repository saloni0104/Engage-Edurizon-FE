import { Navbar } from "../../components/navbar.js";
import { noteContainer } from "../../components/noteContainer.js";

document.getElementById("preloader").style.display = "block";

window.onload = () => {
  document.getElementById("preloader").style.display = "none";
  const identifier = localStorage.getItem("identifier");

  // Sidebar change as per teacher or student
  if (identifier?.toLowerCase().charAt(0) === "t") {
    document.getElementsByClassName("sidebar")[0].innerHTML = Navbar({
      isTeacher: true,
      activeSection: "MyCourse",
    });
  } else {
    document.getElementsByClassName("sidebar")[0].innerHTML = Navbar({
      activeSection: "MyCourse",
    });
  }

  //Notes
  document.getElementById("note-taking").innerHTML = noteContainer();
};
