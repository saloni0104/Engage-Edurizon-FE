import { Navbar } from "../../components/navbar.js";
import { TopNavbar } from "../../components/topNavbar.js";
import { noteContainer } from "../../components/noteContainer.js";

document.getElementById("preloader").style.display = "block";
window.onload = () => {
  document.getElementById("preloader").style.display = "none";

  const identifier = localStorage.getItem("identifier");

  //Token to get name
  let token = localStorage.getItem("token");
  const { name } = JSON.parse(
    Buffer.from(token?.split(".")[1], "base64")?.toString()
  );
  // Teacher View
  if (identifier?.toLowerCase().charAt(0) === "t") {
    document.getElementsByClassName("sidebar")[0].innerHTML = Navbar({
      isTeacher: true,
      activeSection: "Assignments",
    });
    document.getElementsByClassName("top-navbar")[0].innerHTML = TopNavbar({
      title: "Post Assignment",
      name,
    });
  }
  //Student View 
  else {
    document.getElementsByClassName("sidebar")[0].innerHTML = Navbar({
      activeSection: "Assignments",
    });
    document.getElementsByClassName("top-navbar")[0].innerHTML = TopNavbar({
      title: "My Assignments",
      name,
    });
  }
  //Notes
  document.getElementById("note-taking").innerHTML = noteContainer();
};
