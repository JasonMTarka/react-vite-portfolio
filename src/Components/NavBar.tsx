import "../CSS/NavBar.css";
import { PAGES } from "./constants";
import NavBarButton from "./NavBarButton";
import type { Page } from "./types";
import { useState } from "react";

const NavBar = ({ updatePage }: { updatePage: (newPage: Page) => void }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleHamburgerClick = () => setMenuOpen((open) => !open);
  const handleNavClick = (page: Page) => {
    updatePage(page);
    setMenuOpen(false); // close menu on nav click (mobile)
  };

  return (
    <nav className="navbar">
      <button
        className={`navbar-hamburger${menuOpen ? " open" : ""}`}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="navbar-menu"
        onClick={handleHamburgerClick}
        type="button"
      >
        <span className="hamburger-bar" />
        <span className="hamburger-bar" />
        <span className="hamburger-bar" />
      </button>
      <div id="navbar-menu" className={`navbar-menu${menuOpen ? " show" : ""}`}>
        <NavBarButton updatePage={handleNavClick} page={PAGES.home} />
        <NavBarButton updatePage={handleNavClick} page={PAGES.puzzle} />
        <NavBarButton updatePage={handleNavClick} page={PAGES.coming_soon} />
        <NavBarButton updatePage={handleNavClick} page={PAGES.contact} />
      </div>
    </nav>
  );
};

export default NavBar;
