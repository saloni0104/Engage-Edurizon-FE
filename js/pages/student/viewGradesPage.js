// document.getElementById("preloader").style.display = "block";
import { Navbar } from "../../components/navbar.js";
import { TopNavbar } from "../../components/topNavbar.js";
import { noteContainer } from "../../components/noteContainer.js";

document.getElementById("preloader").style.display = "block";
window.onload = () => {
  document.getElementById("preloader").style.display = "none";
  const identifier = localStorage.getItem("identifier");

  //Token to generate name
  let token = localStorage.getItem("token");
  const { name } = JSON.parse(
    Buffer.from(token?.split(".")[1], "base64")?.toString()
  );

  // Sidebar of that page
  if (identifier?.toLowerCase().charAt(0) !== "t") {
    document.getElementsByClassName("sidebar")[0].innerHTML = Navbar({
      activeSection: "Grades",
    });
  }

  //Topbar
  document.getElementsByClassName("top-navbar")[0].innerHTML = TopNavbar({
    title: "View Grades",
    name,
  });

  //Notes
  document.getElementById("note-taking").innerHTML = noteContainer();
};
