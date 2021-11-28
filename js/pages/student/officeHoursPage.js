import { Navbar } from "../../components/navbar.js";
import { TopNavbar } from "../../components/topNavbar.js";
import { noteContainer } from "../../components/noteContainer.js";

document.getElementById("preloader").style.display = "block";
window.onload = function () {
  document.getElementById("preloader").style.display = "none";
  //Token to get name
  let token = localStorage.getItem("token");
  const { name } = JSON.parse(
    Buffer.from(token?.split(".")[1], "base64")?.toString()
  );

  //Identify Teacher or Student
  const identifier = localStorage.getItem("identifier");
  // Sidebar of that page
  if (identifier?.toLowerCase().charAt(0) !== "t") {
    document.getElementsByClassName("sidebar")[0].innerHTML = Navbar({
      isTeacher: false,
      activeSection: "OfficeHoursStudent",
    });
  }

  //Topbar
  document.getElementsByClassName("top-navbar")[0].innerHTML = TopNavbar({
    title: "Office Hours",
    name,
  });

  //Notes
  document.getElementById("note-taking").innerHTML = noteContainer();
};
