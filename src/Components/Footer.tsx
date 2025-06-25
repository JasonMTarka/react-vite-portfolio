import React from "react";
import "../CSS/App.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div>© {new Date().getFullYear()} Jason Tarka. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
