import Puzzle from "./Puzzle/Puzzle";
import Home from "./Home";
import { PAGES } from "./constants";
import ContactPage from "./ContactPage";
import Placeholder from "./Placeholder";
import Events from "./Tokyo_Events/Events";

export default function Body({ currentPage }: { currentPage: string }) {
  const displayPage = () => {
    switch (currentPage) {
      case PAGES.home:
        return <Home />;
      case PAGES.puzzle:
        return <Puzzle />;
      case PAGES.contact:
        return <ContactPage />;
      case PAGES.events:
        return <Events />;
    }
    return <Placeholder />;
  };

  return <>{displayPage()}</>;
}
