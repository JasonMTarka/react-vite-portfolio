import React from "react";
import { useState, useEffect } from "react";

const NavBar: React.FC = () => {
  const [label, setLabel] = useState("Navigation");

  useEffect(() => {
    alert("On page load");
  }, []);

  const handleClick = () => {
    if (label === "Navigation") {
      setLabel("Navigation Clicked");
    } else if (label === "Navigation Clicked") {
      setLabel("Navigation");
    }
  };

  return (
    <nav>
      <button onClick={handleClick}>{label}</button>
    </nav>
  );
};

export default NavBar;
