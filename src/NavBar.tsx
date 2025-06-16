import { useEffect, useState } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [path, setPath] = useState("home");

  useEffect(() => {
    navigate("/react-vite-portfolio/" + path);
  }, [path, navigate]);

  return (
    <nav className="navbar">
      <button className="navbar-btn" onClick={() => setPath("home")}>
        Home
      </button>
      <button className="navbar-btn" onClick={() => setPath("puzzle")}>
        Manor Puzzle
      </button>
    </nav>
  );
};

export default NavBar;
