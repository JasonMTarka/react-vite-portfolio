import type { Blueprint } from "./types";

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

  return (
    <div
      className={"choice-cell " + (!active ? "inactive-choice-cell" : "")}
      onClick={onClick}
      onMouseEnter={highlightSurroundingRooms}
      onMouseLeave={removeArrows}
    >
      <div className="blueprint-title">{blueprint ? blueprint.name : ""}</div>
      <div className="gem-cost">
        {blueprint?.cost ? "Gem cost: " + blueprint.cost : ""}
      </div>
      <div className="arrows">{blueprint?.directions}</div>
    </div>
  );
};

export default ChoiceBox;
