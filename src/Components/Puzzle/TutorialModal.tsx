const TutorialModal = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) => {
  if (!show) {
    return null; // Don't render if 'show' is false
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1>The Manor Game</h1>
        <p>
          Your uncle bestowed upon you his manor in his will, but only if you
          can reach the Antechamber. Can you make your way through the manor?
        </p>
        <h2>Here's a basic explanation of the rules:</h2>
        <p>
          You start in the Entrance Hall, and your goal is to reach the
          Antechamber in the most northern row of the mansion. You can move
          around the manor using either the WASD or arrow keys. (No mobile
          support yet unfortunately!)
        </p>
        <p>
          Each time you enter a new room, you have the option of three rooms to
          choose from. Each room has a certain number of doors which you can use
          to progress through the manor. You can see which doors lead to which
          rooms by looking at the arrows.
        </p>
        <p>
          Some rooms cost gems to unlock. You start with zero gems, but as you
          progress through the manor you might find more. Rooms that cost gems
          might have the chance for bigger rewards or have more doors than
          normal.
        </p>
        <p>
          As you progress further north, there will be an increasing likelihood
          of locked doors. You can use keys you've found along the way to open
          them.
        </p>
        <h3>Good luck!</h3>
        <button onClick={onClose} className="btn tutorial">
          Enter the Manor
        </button>
      </div>
    </div>
  );
};

export default TutorialModal;
