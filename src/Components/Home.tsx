import React, { useEffect, useState } from "react";
import profileImg from "../assets/portfolio-photo.jpg"; // Example image, replace with your own if desired
import SideBar from "./SideBar";
import MyList from "./MyList";

const Home: React.FC = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className="home-container">
      <div className="home-flex">
        <article className="home-info">
          <div
            className={`home-title-row fade-in-section ${
              fadeIn ? "animation" : ""
            }`}
          >
            <h1 className="home-title">Jason Tarka</h1>
            <img src={profileImg} alt="Profile" className="home-title-img" />
          </div>
          <section
            className={`home-info fade-in-section ${
              fadeIn ? "animation delay1" : ""
            }`}
          >
            <h2>About Me</h2>
            <p>
              Hi, thanks for stopping by! I'm an American software developer
              who's been living in Tokyo for the past seven years. Time flies
              doesn't it?
            </p>
            <p>
              I have four years of experience as a developer, with a wide range
              of experience gained from working on a large-scale React
              application and developing on the ServiceNow platform.
            </p>
            <div style={{ display: "inline-flex" }}>
              <MyList
                title="Languages and Tools"
                contents={[
                  "React",
                  "TypeScript",
                  "Python",
                  "Node.js",
                  "MySQL",
                  "AWS S3 & Lambda",
                ]}
              />
              <MyList
                title="Professional Skills"
                contents={[
                  "Agile Development",
                  "Project Management (Jira)",
                  "Native English and Fluent (JLPT N1) Japanese",
                ]}
              />
            </div>
            <p>
              In my free time you can find me at the bouldering gym or cycling
              around Tokyo! I also support my local community by volunteering at
              events such as Yamathon, Spartan Race, and Tokyo Marathon.
            </p>
          </section>
          <br />
          <section
            className={`home-info fade-in-section ${
              fadeIn ? "animation delay2" : ""
            }`}
          >
            <h2>About this Site</h2>
            <p>
              For my new portfolio, I tried to recreate the 2025 video game Blue
              Prince in a React app. While my version was created in about a
              week and doesn't have near the level of depth of the original, I
              hope you enjoy the novelty of it.
            </p>
            <p>
              I also have a simple Events page which fetches some events from
              Tokyo Open Data using their public APIs.
            </p>
            <p>
              One of my main goals for this site is to experiment and gain
              experience using AI as a coding assistant. However, all ideas are
              my own. Delegating tasks like initializing components and CSS
              styles has made creating this site much faster and more fun than
              ever before.
            </p>
          </section>
        </article>
        <SideBar />
      </div>
    </div>
  );
};

export default Home;
