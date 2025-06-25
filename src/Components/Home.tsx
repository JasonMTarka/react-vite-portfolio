import React from "react";
import profileImg from "../assets/portfolio-photo.jpg"; // Example image, replace with your own if desired
import SideBar from "./SideBar";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="home-flex">
        <div className="home-info">
          <div className="home-title-row">
            <h1 className="home-title">Jason Tarka's Portfolio</h1>
            <img
              src={profileImg}
              alt="Profile"
              className="home-title-img"
              height={88}
              width={66}
            />
          </div>
          <h2>About Me</h2>
          <p>
            Hi, thanks for stopping by! I'm an American software developer who's
            been living in Tokyo for the past seven years. Time flies doesn't
            it?
          </p>
          <p>
            I have been working as a developer for four years, with a wide range
            of experience from working on a large-scale React application
            interfacing with AWS S3, RDS, Lambda on the backend. I also have
            extensive experience developing on the ServiceNow platform, writing
            business logic and transforming data with Javascript and ServiceNow
            APIs.
          </p>
          <p>
            This is a new portfolio website I started on June 15th, 2025. My
            previous portfolio was also a React web application, but I created
            it using Create React App which has since been deprecated. Creating
            this new portfolio from scratch with Vite has helped familiarize
            myself with the latest build tools.
          </p>
          <p>
            One of my main goals for this site is to experiment and gain
            experience using AI as a coding assistant, primarily with Copilot in
            agent mode. However, all the ideas you see are my own. Delegating
            tasks like initializing components and CSS styles has made creating
            this site much faster and more fun than ever before.
          </p>
          <br />
          <h2>The Manor Game</h2>
          <p>
            For my new portfolio, I tried to recreate the 2025 video game Blue
            Prince in a React app. While my version was created in about a week
            and doesn't have near the level of depth of the original, I hope you
            enjoy the novelty of it.
          </p>
          <h2>Here's a basic explanation of the rules:</h2>
          <p>
            You start in the Entrance Hall, and your goal is to reach the
            Antechamber in the most northern row of the mansion. You can move
            around the manor using either the WASD or arrow keys.
          </p>
          <p>
            Each time you enter a new room, you have the option of three rooms
            to choose from. Each room has a certain number of doors which you
            can use to progress through the manor. You can see which doors lead
            to which rooms by looking at the arrows.
          </p>
          <p>
            Some rooms cost gems to unlock. You start with zero gems, but as you
            progress through the manor you might find more. Rooms that cost gems
            might have the chance for bigger rewards or have more doors than
            normal.
          </p>
          <p>
            As you progress further north, there will be an increasing
            likelihood of locked doors. You can use keys you've found along the
            way to open them.
          </p>
          <h3>Good luck!</h3>
        </div>
        <SideBar />
      </div>
    </div>
  );
};

export default Home;
