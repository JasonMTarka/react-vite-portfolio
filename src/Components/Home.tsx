import React from "react";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1 style={{ textAlign: "center" }}>Jason Tarka's Portfolio</h1>
      <p>This is a new portfolio website I've created using Vite React.</p>
      <p>
        One of my goals for this site is to experiment and gain experience using
        AI as a coding assistant, primarily with Copilot in agent mode.
      </p>
      <br />
      <h2>
        Here's a basic explanation of the Manor Game rules for any early
        playtesters who might be coming from Malaysia:
      </h2>
      <p>
        The goal is to reach the Antechamber in the most northern row of the
        mansion.
      </p>
      <p>
        Each time you enter a new room, you have the option of three rooms to
        choose from. Each room has a certain number of doors which you can use
        to progress through the manor. You can see which doors lead to which
        rooms by looking at the arrows.
      </p>
      <p>
        Some rooms cost gems to unlock. You start with 0 gems, but as you
        progress through the manor you might find more. Rooms that cost gems
        might have the chance for bigger rewards or more doors.
      </p>
      <p>
        Also, as you go further north, you might encounter locked doors. You
        will need keys to open them.
      </p>
      <p>Good luck!</p>
    </div>
  );
};

export default Home;
