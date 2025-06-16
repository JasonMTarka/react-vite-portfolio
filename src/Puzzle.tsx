import React from "react";
import "./Puzzle.css";

const ROWS = 9;
const COLS = 5;

const Puzzle: React.FC = () => {
  return (
    <>
      <div className="puzzle-explain">
        Your uncle bestowed upon you his manor in his will, but only if you can
        reach the final room. Can you make your way through the maze?
      </div>
      <div className="puzzle-grid">
        {Array.from({ length: ROWS }).map((_, rowIdx) => (
          <div className="puzzle-row" key={rowIdx}>
            {Array.from({ length: COLS }).map((_, colIdx) => (
              <div
                className="puzzle-cell"
                key={"cell_" + colIdx.toString() + rowIdx.toString()}
                id={"cell_" + colIdx.toString() + rowIdx.toString()}
                onClick={() =>
                  alert("cell_" + colIdx.toString() + rowIdx.toString())
                }
              ></div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Puzzle;
