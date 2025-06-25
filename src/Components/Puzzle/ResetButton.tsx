const ResetButton = ({
  resetActive,
  onClick,
}: {
  resetActive: boolean;
  onClick: () => void;
}) => {
  return (
    <>
      <button
        className={`btn reset ${resetActive ? "active" : ""}`}
        onClick={onClick}
      >
        Reset Manor
      </button>
    </>
  );
};

export default ResetButton;
