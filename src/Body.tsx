import { Routes, Route } from "react-router-dom";
import Puzzle from "./Puzzle";
import Home from "./Home";

export default function Body() {
  const basePath = "/react-vite-portfolio";

  return (
    <Routes>
      <Route index path={basePath} element={<Home />} />
      <Route path={basePath + "/puzzle"} element={<Puzzle />} />
    </Routes>
  );
}
