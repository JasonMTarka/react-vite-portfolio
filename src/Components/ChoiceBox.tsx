import type { Blueprint } from "./blueprints";

const convertDirectionsToArrows = (directions: string[]) => {
  return directions.map((direction) => {
    return direction.replace("left", "←");
  });
};

const ChoiceBox = ({
  blueprint,
  handleClick,
  active,
}: {
  blueprint: Blueprint;
  handleClick: (blueprint: Blueprint) => void;
  active: boolean;
}) => {
  const onClick = () => {
    handleClick(blueprint);
  };

  return (
    <div
      className={"side-cell " + (!active ? "inactive-side-cell" : "")}
      onClick={onClick}
    >
      <div className="blueprint-title">{blueprint ? blueprint.name : ""}</div>
      <div className="gem-cost">
        {blueprint?.cost ? "Gem cost: " + blueprint.cost : ""}
      </div>
      <div className="arrows">
        {blueprint ? convertDirectionsToArrows(blueprint.directions) : ""}
      </div>
    </div>
  );
};

export default ChoiceBox;
