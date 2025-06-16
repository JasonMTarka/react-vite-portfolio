import { useEffect } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const porfolioNavigate = (path: string) => {
    navigate("/react-vite-portfolio/" + path);
  };
  useEffect(() => {
    console.log("Loaded");
    localStorage.setItem("firstLoad", "title");
  }, []);

  return (
    <nav className="navbar">
      <button className="navbar-btn" onClick={() => porfolioNavigate("home")}>
        Home
      </button>
      <button className="navbar-btn" onClick={() => porfolioNavigate("puzzle")}>
        Manor Puzzle
      </button>
    </nav>
  );
};

export default NavBar;
