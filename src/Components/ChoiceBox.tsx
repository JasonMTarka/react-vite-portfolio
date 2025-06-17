import type { Blueprint } from "./ManorData";

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
      <div>{blueprint ? blueprint.name : ""}</div>
      <div>{blueprint ? blueprint.cost : ""}</div>
    </div>
  );
};

export default ChoiceBox;
