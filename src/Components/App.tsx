import "../CSS/App.css";
import NavBar from "./NavBar";
import Body from "./Body";
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const updatePage = (newPage: string) => {
    setCurrentPage(newPage);
  };

  return (
    <Router>
      <NavBar updatePage={updatePage} />
      <Body currentPage={currentPage} />
    </Router>
  );
}

export default App;
