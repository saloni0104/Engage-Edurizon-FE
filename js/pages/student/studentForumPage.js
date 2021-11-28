
import { Navbar } from "../../components/navbar.js";
import { TopNavbar } from "../../components/topNavbar.js";
import { noteContainer } from "../../components/noteContainer.js";

document.getElementById("preloader").style.display = "block";
window.onload = () => {
  document.getElementById("preloader").style.display = "none";

  //Token to generate Name
  let token = localStorage.getItem("token");
  const { name } = JSON.parse(
    Buffer.from(token?.split(".")[1], "base64")?.toString()
  );

  //Identifier to check Teacher or Student
  const identifier = localStorage.getItem("identifier");

  // Sidebar of that page
  if (identifier?.toLowerCase().charAt(0) !== "t") {
    document.getElementsByClassName("sidebar")[0].innerHTML = Navbar({
      activeSection: "StudentForum",
    });
  }

  //Navbar
  document.getElementById("top-navbar").innerHTML = TopNavbar({
    title: "Student Forum",
    name,
  });

  //Notes
  document.getElementById("note-taking").innerHTML = noteContainer();
};
