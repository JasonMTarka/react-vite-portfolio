import type { Blueprint } from "./types";

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
      className={"choice-cell " + (!active ? "inactive-choice-cell" : "")}
      onClick={onClick}
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
