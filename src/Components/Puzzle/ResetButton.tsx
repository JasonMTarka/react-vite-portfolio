const ResetButton = ({
  victory,
  onClick,
}: {
  victory: boolean;
  onClick: () => void;
}) => {
  return (
    <>
      <button
        className={`reset-btn ${victory ? "reset-btn-victory" : ""}`}
        onClick={onClick}
      >
        Reset Manor
      </button>
    </>
  );
};

export default ResetButton;
