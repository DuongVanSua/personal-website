import React, { useState, useEffect, useCallback } from "react";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import "./Resume.css";

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
    const subscription =
      ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);
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
    // --- Frontend ---
    { skill: "HTML, CSS, JavaScript", ratingPercentage: 90 },
    { skill: "React.js", ratingPercentage: 85 },
    { skill: "Vue.js", ratingPercentage: 80 },

    // --- Backend ---
    { skill: "Node.js", ratingPercentage: 85 },
    { skill: "Laravel (PHP)", ratingPercentage: 80 },
    { skill: "Java & Spring Boot", ratingPercentage: 80 },
    { skill: "MySQL", ratingPercentage: 75 },

    // --- Mobile ---
    { skill: "React Native", ratingPercentage: 80 },

    // --- Tools & Others ---
    { skill: "Git & GitHub", ratingPercentage: 85 },
    { skill: "Docker", ratingPercentage: 70 },
  ];

  const projectDetails = [
    {
      title: "Web Developer – Luxon Viet Nam Co., Ltd (Remote)",
      duration: { fromDate: "Dec 2024", toDate: "Oct 2025" },
      description:
        "Developed a real-world educational web platform in a 3-member team. Full-stack role handling both frontend and backend tasks. Focused on performance, scalability, and maintainability.",
      subHeading:
        "Technologies Used: Laravel / PHP / MySQL (backend), Vue.js / TypeScript (frontend), Docker, Agile methodology",
    },
    {
      title: "Food Selling App – Course Project (2 Members)",
      duration: { fromDate: "Apr 2025", toDate: "May 2025" },
      description:
        "A mobile fast-food ordering application with a user-friendly interface, allowing customers to browse, order, and pay for meals easily. Integrated AI Chat for smart customer support.",
      subHeading:
        "Technologies Used: Android (Java), Spring Boot, MySQL, Retrofit",
    },
    {
      title: "Personal Portfolio Website",
      duration: { fromDate: "Oct 03, 2025", toDate: "Oct 20, 2025" },
      description:
        "A personal portfolio website to showcase projects, skills, and experiences with a responsive UI and modern animations.",
      subHeading: "Technologies Used: React.js, Node.js, Bootstrap",
    },
  ];

  const resumeDetails = [
    // Education
    <div className="resume-screen-container" key="education">
      <ResumeHeading
        heading={"University"}
        subHeading={
          "University of Information Technology – Vietnam National University, Ho Chi Minh City"
        }
        fromDate={"2022"}
        toDate={"2026"}
      />
      <ResumeHeading
        heading={"High School"}
        subHeading={"N’Trang Lơng Ethnic Boarding High School"}
        fromDate={"2019"}
        toDate={"2022"}
      />
      <ResumeHeading
        heading={"Secondary School"}
        subHeading={"Quang Hoa Secondary School"}
        fromDate={"2015"}
        toDate={"2019"}
      />
    </div>,

    // Work History
    <div className="resume-screen-container" key="work-experience">
      <ResumeHeading
        heading={"Personal & Academic Projects"}
        subHeading={"Frontend - Backend - Mobile Development"}
        fromDate={"2022"}
        toDate={"Present"}
      />
      <div className="experience-description">
        <span className="resume-description-text">
          • Gained hands-on experience by building multiple web and mobile
          applications across frontend, backend, and full-stack environments.
        </span>
      </div>
      <div className="experience-description">
        <span className="resume-description-text">
          • Designed and developed responsive web interfaces using React and
          Vue.js, focusing on clean UI/UX and component-based architecture.
        </span>
      </div>
      <div className="experience-description">
        <span className="resume-description-text">
          • Implemented backend APIs and authentication systems with Node.js and
          Express, ensuring performance, scalability, and secure data flow.
        </span>
      </div>
      <div className="experience-description">
        <span className="resume-description-text">
          • Built mobile applications using React Native with seamless
          integration to backend APIs for real-time data synchronization.
        </span>
      </div>
      <div className="experience-description">
        <span className="resume-description-text">
          • Deployed full-stack projects and personal portfolio websites
          showcasing practical experience and continuous learning.
        </span>
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
        heading="Sports"
        description="I enjoy playing football, volleyball, and badminton — staying active helps me stay focused and balanced."
      />
      <ResumeHeading
        heading="Social Activities"
        description="I actively participate in community programs such as voluntary blood donation, having donated five times so far."
      />
      <ResumeHeading
        heading="Reading"
        description="I love reading books about technology, self-development, and ethics to broaden my perspective and mindset."
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
        className={
          index === selectedBulletIndex ? "bullet selected-bullet" : "bullet"
        }
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
    <div
      className="resume-container screen-container fade-in"
      id={props.id || ""}
    >
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
