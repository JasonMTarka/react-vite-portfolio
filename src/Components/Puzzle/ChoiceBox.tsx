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

  const renderTitle = () => {
    return blueprint ? (
      <div className="blueprint-title">{blueprint ? blueprint.name : ""}</div>
    ) : null;
  };

  const renderCost = () => {
    return blueprint?.cost ? (
      <div className="gem-cost">{`Gem cost: ${blueprint.cost}`}</div>
    ) : null;
  };

  const renderArrows = () => {
    return blueprint ? (
      <div className="arrows">
        {blueprint.directions.map((dir) => {
          return arrowDisplay[dir];
        })}
      </div>
    ) : null;
  };

  const renderResources = () => {
    const resourceText = (
      resource: Resource,
      count: number | undefined = 0
    ) => {
      return count ? (
        <span
          className={`blueprint-resources ${resource}`}
          key={resource}
        >{`+${count} ${capitalizeFirstLetter(
          removePlural(resource, count)
        )} `}</span>
      ) : null;
    };

    return active ? (
      <div>
        {[
          { resource: RESOURCES.gems, count: blueprint.gems },
          { resource: RESOURCES.keys, count: blueprint.keys },
          { resource: RESOURCES.coins, count: blueprint.coins },
        ].map((resource) => {
          return resourceText(resource.resource, resource.count);
        })}
      </div>
    ) : null;
  };

  return (
    <div
      className={"choice-cell " + (active ? "active" : "inactive")}
      onClick={onClick}
      onMouseEnter={highlightSurroundingRooms}
      onMouseLeave={removeArrows}
    >
      {renderTitle()}
      {renderCost()}
      {renderArrows()}
      {renderResources()}
    </div>
  );
};

export default ChoiceBox;
