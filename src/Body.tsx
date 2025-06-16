import { Routes, Route } from "react-router-dom";
import Puzzle from "./Puzzle";

export default function Body() {
  const basePath = "/react-vite-portfolio";

  return (
    <Routes>
      <Route index path={basePath + "/home"} element={<>Home</>} />
      <Route path={basePath + "/puzzle"} element={<Puzzle />} />
    </Routes>
  );
}
