import { useEffect, useState } from "react";
import "../CSS/NavBar.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [path, setPath] = useState("");

  useEffect(() => {
    navigate("/react-vite-portfolio/" + path);
  }, [path, navigate]);

  return (
    <nav className="navbar">
      <button className="navbar-btn" onClick={() => setPath("")}>
        Home
      </button>
      <button className="navbar-btn" onClick={() => setPath("puzzle")}>
        Manor Puzzle
      </button>
      <button className="navbar-btn">Coming Soon</button>
    </nav>
  );
};

export default NavBar;
