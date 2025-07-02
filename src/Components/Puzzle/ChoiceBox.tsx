import type { Blueprint, Resource } from "./puzzleTypes";
import { arrowDisplay } from "./puzzleUtil";
import { RESOURCES } from "./puzzleConstants";
import ResourceIcon from "./ResourceIcon";

const ChoiceBox = ({
  blueprint,
  handleClick,
  active,
  handleRoomHighlight,
  removeArrows,
}: {
  blueprint: Blueprint;
  handleClick: (blueprint: Blueprint) => void;
  active: boolean;
  handleRoomHighlight: () => void;
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
      <div className="gem-cost">
        {`Cost: ${blueprint.cost}`}
        <ResourceIcon resource={RESOURCES.gems} />
      </div>
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
        <span className={`blueprint-resources ${resource}`} key={resource}>
          {`+${count}`}
          <ResourceIcon resource={resource} />
        </span>
      ) : null;
    };

    return active ? (
      <div>
        {Object.values(RESOURCES).map((resource) => {
          return resourceText(resource, blueprint[resource]);
        })}
      </div>
    ) : null;
  };

  return (
    <div
      className={"choice-cell " + (active ? "active" : "inactive")}
      onClick={onClick}
      onMouseEnter={handleRoomHighlight}
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
