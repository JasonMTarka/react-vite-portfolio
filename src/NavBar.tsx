import { useState, useEffect } from "react";
import "./NavBar.css";

const NavBar = ({ title }: { title: string }) => {
  const [label, setLabel] = useState(title);

  useEffect(() => {
    console.log("Loaded");
    localStorage.setItem("firstLoad", "title");
  }, []);

  const handleClick = () => {
    if (label === "Navigation") {
      setLabel("Navigation Clicked");
    } else if (label === "Navigation Clicked") {
      setLabel("Navigation");
    } else {
      setLabel("Navigation");
    }
  };

  return (
    <nav className="navbar">
      <button className="navbar-btn" onClick={handleClick}>
        Button 1
      </button>
      <button className="navbar-btn" onClick={handleClick}>
        Button 2
      </button>
      <button className="navbar-btn" onClick={handleClick}>
        Button 3
      </button>
    </nav>
  );
};

export default NavBar;
