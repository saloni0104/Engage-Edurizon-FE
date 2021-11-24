import { Navbar } from "../../components/navbar.js";
import {noteContainer} from "../../components/noteContainer.js";

window.onload = () => {
  const identifier = localStorage.getItem("identifier");
  // Sidebar of that page
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

  document.getElementById("note-taking").innerHTML = noteContainer();
};
