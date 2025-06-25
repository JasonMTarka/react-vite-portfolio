import type { Blueprint, Resource } from "./puzzleTypes";
import {
  arrowDisplay,
  removePlural,
  capitalizeFirstLetter,
} from "./puzzleUtil";
import { RESOURCES } from "./puzzleConstants";

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
    const resourceText = (resource: Resource, count: number | undefined) => {
      if (!count) {
        return "";
      }
      return (
        <span
          className={`blueprint-resources blueprint-${resource}`}
          key={resource}
        >{`+${count} ${capitalizeFirstLetter(
          removePlural(resource, count)
        )} `}</span>
      );
    };

    if (!active) {
      return "";
    }

    return (
      <div>
        {[
          { resource: RESOURCES.gems, count: blueprint.gems },
          { resource: RESOURCES.keys, count: blueprint.keys },
          { resource: RESOURCES.coins, count: blueprint.coins },
        ].map((resource) => {
          return resourceText(resource.resource, resource.count);
        })}
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
