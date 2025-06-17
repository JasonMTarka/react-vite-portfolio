import "../CSS/App.css";
import NavBar from "./NavBar";
import Body from "./Body";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Body />
    </Router>
  );
}

export default App;
