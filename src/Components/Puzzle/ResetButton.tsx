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
        className={`reset-btn ${resetActive ? "reset-btn-active" : ""}`}
        onClick={onClick}
      >
        Reset Manor
      </button>
    </>
  );
};

export default ResetButton;
