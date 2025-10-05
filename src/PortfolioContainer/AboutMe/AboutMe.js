import React, { useEffect } from "react";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import "./AboutMe.css";

export default function AboutMe(props) {
  const fadeInScreenHandler = (screen) => {
    if (!screen || screen.fadeInScreen !== props.id) return;
    Animations.animations.fadeInScreen(props.id);
  };

  useEffect(() => {
    const subscription = ScrollService.currentScreenFadeIn.subscribe(
      fadeInScreenHandler
    );
    return () => subscription.unsubscribe();
  }, [props.id]);

  const SCREEN_CONSTANTS = {
    description: `I'm an Information Systems student passionate about building real software that solves real problems.
I'm seeking a Software Engineer Internship where I can contribute to impactful systems, learn from experienced engineers,
and grow through hands-on coding, collaboration, and continuous improvement. My goal is to become a well-rounded developer
by building, breaking, and learning — one line of code at a time.`,
    highlights: {
      bullets: [
        "Programming Languages: Java, C++, PHP, JavaScript, TypeScript",
        "Frameworks & Libraries: Laravel, Vue.js",
        "Tools & Platforms: Docker, Git, Linux, Postman",
        "Databases: MySQL",
        "Concepts & Practices: Algorithms & Data Structures, OOP, RESTful API, MVC, Agile, CI/CD",
        "Others: Distributed Systems (basic), API Design, Debugging & Refactoring",
      ],
      heading: "Here are a Few Highlights:",
    },
  };

  const renderHighlight = () =>
    SCREEN_CONSTANTS.highlights.bullets.map((value, i) => (
      <div className="highlight" key={i}>
        <span className="highlight-blob" />
        <span>{value}</span>
      </div>
    ));

  return (
    <div className="about-me-container screen-container" id={props.id || ""}>
      <div className="about-me-parent">
        <ScreenHeading title={"About Me"} subHeading={"Why Choose Me?"} />

        <div className="about-me-card">
          <div className="about-me-profile" />
          <div className="about-me-details">
            <p className="about-me-description">
              {SCREEN_CONSTANTS.description}
            </p>

            <div className="about-me-highlights">
              <div className="highlight-heading">
                <span>{SCREEN_CONSTANTS.highlights.heading}</span>
              </div>
              {renderHighlight()}
            </div>

            <div className="about-me-options">
              <button className="btn primary-btn" type="button">Hire Me</button>
              <a href="/DuongVanSua_CV.pdf" download="DuongVanSua_CV.pdf">
                <button className="btn highlighted-btn" type="button">
                  Get Resume
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
