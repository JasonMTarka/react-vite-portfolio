import React from "react";
import "../CSS/App.css"; // Import the CSS file for styling

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <a
        href="https://github.com/JasonMTarka/"
        target="_blank"
        rel="noopener noreferrer"
        className="sidebar-link"
      >
        GitHub
      </a>
      <a
        href="https://www.linkedin.com/in/jason-t-342b371a6/"
        target="_blank"
        rel="noopener noreferrer"
        className="sidebar-link"
      >
        LinkedIn
      </a>
    </div>
  );
};

export default Sidebar;
