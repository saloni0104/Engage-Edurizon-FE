import { Navbar } from "../../components/navbar.js";
import { TopNavbar } from "../../components/topNavbar.js";
import { noteContainer } from "../../components/noteContainer.js";

window.onload = () => {
  const identifier = localStorage.getItem("identifier");
  let token = localStorage.getItem("token");
  const { name } = JSON.parse(
    Buffer.from(token?.split(".")[1], "base64")?.toString()
  );
  // Sidebar of that page
  if (identifier?.toLowerCase().charAt(0) === "t") {
    document.getElementsByClassName("sidebar")[0].innerHTML = Navbar({
      isTeacher: true,
      activeSection: "Assignments",
    });
    document.getElementsByClassName("top-navbar")[0].innerHTML = TopNavbar({
      title: "Post Assignment",
      name,
    });
  } else {
    document.getElementsByClassName("sidebar")[0].innerHTML = Navbar({
      activeSection: "Assignments",
    });
    document.getElementsByClassName("top-navbar")[0].innerHTML = TopNavbar({
      title: "My Assignments",
      name,
    });
  }

  document.getElementById("note-taking").innerHTML = noteContainer();
};
