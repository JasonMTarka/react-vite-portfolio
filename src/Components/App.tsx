import "../CSS/App.css";
import NavBar from "./NavBar";
import Body from "./Body";
import Footer from "./Footer";
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import type { Page } from "./types";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const updatePage = (newPage: Page) => {
    setCurrentPage(newPage);
  };

  return (
    <Router>
      <div className="app-content">
        <NavBar updatePage={updatePage} />
        <Body currentPage={currentPage} />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
