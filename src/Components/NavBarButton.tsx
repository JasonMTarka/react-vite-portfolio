import type { Page } from "./types";
import { PAGES } from "./constants";

const NavBarButton = ({
  updatePage,
  page,
}: {
  updatePage: (newPage: Page) => void;
  page: Page;
}) => {
  const getText = () => {
    switch (page) {
      case PAGES.home:
        return "Home";
      case PAGES.puzzle:
        return "Manor Game";
      case PAGES.contact:
        return "Contact";
      case PAGES.coming_soon:
        return "Coming Soon";
      case PAGES.events:
        return "Tokyo Events";
    }
  };

  return (
    <button
      className="navbar-btn"
      onClick={() => {
        updatePage(page);
      }}
    >
      {getText()}
    </button>
  );
};

export default NavBarButton;
