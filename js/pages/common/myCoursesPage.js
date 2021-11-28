import { Navbar } from "../../components/navbar.js";
import { TopNavbar } from "../../components/topNavbar.js";
import { noteContainer } from "../../components/noteContainer.js";

document.getElementById("preloader").style.display = "block";


window.onload = () => {
  document.getElementById("preloader").style.display = "none";
  let token = localStorage.getItem("token");
  const { name } = JSON.parse(
    Buffer.from(token?.split(".")[1], "base64")?.toString()
  );

  //Sidebar change as per teacher or student
  const identifier = localStorage.getItem("identifier");
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

  //TopNavbar
  document.getElementById("top-navbar").innerHTML = TopNavbar({
    title: "My Courses",
    name,
  });

  //Notes
  document.getElementById("note-taking").innerHTML = noteContainer();
};
