import "../CSS/NavBar.css";
import { PAGES } from "./constants";
import NavBarButton from "./NavBarButton";
import type { Page } from "./types";

const NavBar = ({ updatePage }: { updatePage: (newPage: Page) => void }) => {
  return (
    <nav className="navbar">
      <NavBarButton updatePage={updatePage} page={PAGES.home} />
      <NavBarButton updatePage={updatePage} page={PAGES.puzzle} />
      <NavBarButton updatePage={updatePage} page={PAGES.coming_soon} />
      <NavBarButton updatePage={updatePage} page={PAGES.contact} />
    </nav>
  );
};

export default NavBar;
