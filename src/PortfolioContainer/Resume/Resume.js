import React, { useState, useEffect, useCallback } from "react";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import'./Resume.css'

export default function Resume(props) {
  const [selectedBulletIndex, setSelectedBulletIndex] = useState(0);
  const [carousalOffSetStyle, setCarousalOffSetStyle] = useState({});

  // Handler fade-in được memo hóa
  const fadeInScreenHandler = useCallback(
    (screen) => {
      if (!screen || screen.fadeInScreen !== props.id) return;
      Animations.animations.fadeInScreen(props.id);
    },
    [props.id]
  );

  useEffect(() => {
    const subscription = ScrollService.currentScreenFadeIn.subscribe(
      fadeInScreenHandler
    );
    return () => subscription.unsubscribe();
  }, [fadeInScreenHandler]);

  // Component heading con dùng trong Resume
  const ResumeHeading = (props) => {
    return (
      <div className="resume-heading">
        <div className="resume-main-heading">
          <div className="heading-bullet" />
          <span className="heading-title">{props.heading || ""}</span>
          {props.fromDate && props.toDate ? (
            <div className="heading-date">
              {props.fromDate + " - " + props.toDate}
            </div>
          ) : null}
        </div>

        {props.subHeading ? (
          <div className="resume-sub-heading">
            <span>{props.subHeading}</span>
          </div>
        ) : null}

        {props.description ? (
          <div className="resume-heading-description">
            <span>{props.description}</span>
          </div>
        ) : null}
      </div>
    );
  };

  const resumeBullets = [
    { label: "Education", logoSrc: "education.svg" },
    { label: "Work History", logoSrc: "work-history.svg" },
    { label: "Programming Skills", logoSrc: "programming-skills.svg" },
    { label: "Projects", logoSrc: "projects.svg" },
    { label: "Interests", logoSrc: "interests.svg" },
  ];

  const programmingSkillsDetails = [
    { skill: "JavaScript", ratingPercentage: 85 },
    { skill: "React JS", ratingPercentage: 85 },
    { skill: "React Native", ratingPercentage: 85 },
    { skill: "Express JS", ratingPercentage: 89 },
    { skill: "Node JS", ratingPercentage: 89 },
    { skill: "MongoDB", ratingPercentage: 70 },
    { skill: "Core Java", ratingPercentage: 80 },
    { skill: "HTML", ratingPercentage: 80 },
    { skill: "CSS", ratingPercentage: 80 },
  ];

  const projectDetails = [
    {
      title: "Personal Portfolio Website",
      duration: { fromDate: "03/10/2025", toDate: "10/10/2025" },
      description:
        "A personal portfolio website to showcase my details and projects in one place.",
      subHeading: "Technologies Used: React JS, Bootstrap",
    },
    {
      title: "Personal Portfolio Website",
      duration: { fromDate: "2020", toDate: "2021" },
      description:
        "A personal portfolio website to showcase my details and projects in one place.",
      subHeading: "Technologies Used: React JS, Bootstrap",
    },
    {
      title: "Personal Portfolio Website",
      duration: { fromDate: "2020", toDate: "2021" },
      description:
        "A personal portfolio website to showcase my details and projects in one place.",
      subHeading: "Technologies Used: React JS, Bootstrap",
    },
    {
      title: "Personal Portfolio Website",
      duration: { fromDate: "2020", toDate: "2021" },
      description:
        "A personal portfolio website to showcase my details and projects in one place.",
      subHeading: "Technologies Used: React JS, Bootstrap",
    },
  ];

  
  const resumeDetails = [
    // Education
    <div className="resume-screen-container" key="education">
      <ResumeHeading
        heading={"University of Information Technology"}
        subHeading={"Information Systems"}
        fromDate={"2022"}
        toDate={"2026"}
      />
      <ResumeHeading
        heading={"University of Information Technology"}
        subHeading={"Information Systems"}
        fromDate={"2022"}
        toDate={"2026"}
      />
      <ResumeHeading
        heading={"University of Information Technology"}
        subHeading={"Information Systems"}
        fromDate={"2022"}
        toDate={"2026"}
      />
    </div>,

    // Work History
    <div className="resume-screen-container" key="work-experience">
      <ResumeHeading
        heading={"VNG Technology"}
        subHeading={"Full Stack Developer Intern"}
        fromDate={"2030"}
        toDate={"Present"}
      />
      <div className="experience-description">
        <span className="resume-description-text">
          Currently working as a MERN stack web and mobile developer and also an
          online instructor.
        </span>
      </div>
      <div className="experience-description">
        <span className="resume-description-text">
          • Developed an ecommerce website for a client with an admin dashboard
          for managing products, reviews, users, and payments.
        </span>
        <br />
        <span className="resume-description-text">• Hello</span>
      </div>
    </div>,

    // Programming Skills
    <div
      className="resume-screen-container programming-skills-container"
      key="programming-skills"
    >
      {programmingSkillsDetails.map((skill, index) => (
        <div className="skill-parent" key={index}>
          <div className="heading-bullet" />
          <span>{skill.skill}</span>
          <div className="skill-percentage">
            <div
              style={{ width: skill.ratingPercentage + "%" }}
              className="active-percentage-bar"
            />
          </div>
        </div>
      ))}
    </div>,

    // Projects
    <div className="resume-screen-container" key="projects">
      {projectDetails.map((proj, index) => (
        <ResumeHeading
          key={index}
          heading={proj.title}
          subHeading={proj.subHeading}
          description={proj.description}
          fromDate={proj.duration.fromDate}
          toDate={proj.duration.toDate}
        />
      ))}
    </div>,

    // Interests
    <div className="resume-screen-container" key="interests">
      <ResumeHeading
        heading="Teaching"
        description="I love sharing knowledge and helping others learn."
      />
      <ResumeHeading
        heading="Music"
        description="Listening to soothing music is my favorite stress reliever."
      />
      <ResumeHeading
        heading="Competitive Gaming"
        description="I enjoy football games and challenging my reflexes."
      />
    </div>,
  ];

  const handleCarousal = (index) => {
    const offsetHeight = 360;
    const newCarousalOffset = {
      style: {
        transform: `translateY(${index * offsetHeight * -1}px)`,
      },
    };
    setCarousalOffSetStyle(newCarousalOffset);
    setSelectedBulletIndex(index);
  };

  const getBullets = () => {
    return resumeBullets.map((bullet, index) => (
      <div
        onClick={() => handleCarousal(index)}
        className={index === selectedBulletIndex ? "bullet selected-bullet" : "bullet"}
        key={index}
      >
        <img
          className="bullet-logo"
          src={require(`../../assets/Resume/${bullet.logoSrc}`)}
          alt="bullet"
        />
        <span className="bullet-label">{bullet.label}</span>
      </div>
    ));
  };

  const getResumeScreen = () => {
    return (
      <div
        style={carousalOffSetStyle.style}
        className="resume-details-carousal"
      >
        {resumeDetails.map((detail) => detail)}
      </div>
    );
  };

  return (
    <div className="resume-container screen-container" id={props.id || ""}>
      <div className="resume-content">
        <ScreenHeading title={"Resume"} subHeading={"My Formal Bio Details"} />
        <div className="resume-card">
          <div className="resume-bullets">
            <div className="bullet-container">
              <div className="bullet-icons" />
              <div className="bullets">{getBullets()}</div>
            </div>
          </div>
          <div className="resume-bullet-details">{getResumeScreen()}</div>
        </div>
      </div>
    </div>
  );
}
