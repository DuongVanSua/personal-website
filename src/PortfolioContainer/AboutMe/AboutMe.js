import React, { useEffect, useCallback } from "react";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import "./AboutMe.css";

export default function AboutMe(props) {
  const fadeInScreenHandler = useCallback(
    (screen) => {
      if (!screen || screen.fadeInScreen !== props.id) return;
      Animations.animations.fadeInScreen(props.id);
    },
    [props.id]
  );

  useEffect(() => {
    const subscription =
      ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);
    return () => subscription.unsubscribe();
  }, [fadeInScreenHandler]);

  const SCREEN_CONSTANTS = {
    description: `I'm an Information Systems student passionate about building real software that creates real value. 
I aim to contribute to a professional environment where I can apply my technical knowledge, learn from experienced mentors, 
and bring fresh energy, creativity, and responsibility to every project.`,

    highlights: {
      heading: "Here are a Few Highlights:",
      bullets: [
        "I bring strong enthusiasm and a growth mindset — always eager to learn, adapt, and improve.",
        "I take ownership of my work, ensuring code quality, reliability, and maintainability.",
        "I contribute positively to team collaboration, communication, and shared success.",
        "I focus on building user-centered applications that solve real problems effectively.",
        "I’m ready to take on challenges, deliver value, and grow together with the company.",
      ],
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
    <div
      className="about-me-container screen-container fade-in"
      id={props.id || ""}
    >
      <div className="about-me-parent">
        <ScreenHeading title="About Me" subHeading="Why Choose Me?" />

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
              <button
                className="btn primary-btn"
                onClick={() => ScrollService.scrollHandler.scrollToHireMe()}
                type="button"
              >
                Hire Me
              </button>
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
