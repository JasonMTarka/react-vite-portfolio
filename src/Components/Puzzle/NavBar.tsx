import "../../CSS/NavBar.css";

const NavBar = ({ updatePage }: { updatePage: (newPage: string) => void }) => {
  return (
    <nav className="navbar">
      <button
        className="navbar-btn"
        onClick={() => {
          updatePage("home");
        }}
      >
        Home
      </button>
      <button
        className="navbar-btn"
        onClick={() => {
          updatePage("puzzle");
        }}
      >
        Manor Puzzle
      </button>
      <button className="navbar-btn">Coming Soon</button>
    </nav>
  );
};

export default NavBar;
