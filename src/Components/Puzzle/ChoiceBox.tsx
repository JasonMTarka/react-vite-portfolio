import type { Blueprint } from "./types";
import { arrowDisplay, removePlural } from "./puzzleUtil";

const ChoiceBox = ({
  blueprint,
  handleClick,
  active,
  highlightSurroundingRooms,
  removeArrows,
}: {
  blueprint: Blueprint;
  handleClick: (blueprint: Blueprint) => void;
  active: boolean;
  highlightSurroundingRooms: () => void;
  removeArrows: () => void;
}) => {
  const onClick = () => {
    handleClick(blueprint);
  };

  const showTitle = () => {
    if (!blueprint) {
      return;
    }
    return (
      <div className="blueprint-title">{blueprint ? blueprint.name : ""}</div>
    );
  };

  const showCost = () => {
    if (!blueprint?.cost) {
      return "";
    }
    return <div className="gem-cost">{`Gem cost: ${blueprint.cost}`}</div>;
  };

  const showArrows = () => {
    if (!blueprint) {
      return;
    }
    return (
      <div className="arrows">
        {blueprint.directions.map((dir) => {
          return arrowDisplay[dir];
        })}
      </div>
    );
  };

  const showResources = () => {
    if (!active) {
      return "";
    }
    const { gems, keys } = blueprint;

    return (
      <div>
        {gems ? (
          <span className="blueprint-resources blueprint-gems">{`+${gems} ${removePlural(
            "Gems",
            gems
          )} `}</span>
        ) : (
          ""
        )}
        {keys ? (
          <span className="blueprint-resources blueprint-keys">{`+${keys} ${removePlural(
            "Keys",
            keys
          )} `}</span>
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <div
      className={
        "choice-cell " +
        (active ? "active-choice-cell" : "inactive-choice-cell")
      }
      onClick={onClick}
      onMouseEnter={highlightSurroundingRooms}
      onMouseLeave={removeArrows}
    >
      {showTitle()}
      {showCost()}
      {showArrows()}
      {showResources()}
    </div>
  );
};

export default ChoiceBox;
