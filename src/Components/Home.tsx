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
            <img src={profileImg} alt="Profile" className="home-title-img" />
          </div>
          <h2>About Me</h2>
          <p>
            Hi, thanks for stopping by! I'm an American software developer who's
            been living in Tokyo for the past seven years. Time flies doesn't
            it?
          </p>
          <p>
            I have four years of experience as a developer, with a wide range of
            experience from working on a large-scale React application
            interfacing with AWS S3, RDS, and Lambda. I also have extensive
            experience developing on the ServiceNow platform, writing business
            logic and transforming data with Javascript and ServiceNow APIs.
          </p>
          <p>
            In my free time you can find me at the bouldering gym or cycling
            around Tokyo. I also enjoy supporting the Tokyo community,
            supporting local and international atheletes by volunteering at
            sporting events including Yamathon, Spartan Race, and Tokyo
            Marathon.
          </p>
          <br />
          <h2>About this Site</h2>
          <p>
            For my new portfolio, I tried to recreate the 2025 video game Blue
            Prince in a React app. While my version was created in about a week
            and doesn't have near the level of depth of the original, I hope you
            enjoy the novelty of it.
          </p>
          <p>
            One of my main goals for this site is to experiment and gain
            experience using AI as a coding assistant, primarily with Copilot in
            agent mode. However, all ideas are my own. Delegating tasks like
            initializing components and CSS styles has made creating this site
            much faster and more fun than ever before.
          </p>
          <p></p>
        </div>
        <SideBar />
      </div>
    </div>
  );
};

export default Home;
