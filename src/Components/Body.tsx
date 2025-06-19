import Puzzle from "./Puzzle/Puzzle";
import Home from "./Home";

export default function Body({ currentPage }: { currentPage: string }) {
  return (
    <>
      {currentPage === "home" ? <Home /> : ""}
      {currentPage === "puzzle" ? <Puzzle /> : ""}
    </>
  );
}
