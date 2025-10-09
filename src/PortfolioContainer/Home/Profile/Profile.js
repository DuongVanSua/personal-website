import React from "react";
import { Typewriter } from "react-simple-typewriter";
import './Profile.css';
import ScrollService from "../../../utilities/ScrollService";


export default function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-parent">
        <div className="profile-details">
          <div className="colz">
            <div className="colz-icon">
              <a
                href="https://web.facebook.com/duong.sua.756671"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-facebook-square"></i>
              </a>
              <a href="mailto:yourmail@example.com">
                <i className="fa fa-google-plus-square"></i>
              </a>
              <a
                href="https://instagram.com/yourprofile"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-instagram"></i>
              </a>
              <a
                href="https://github.com/DuongVanSua"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/sua-duong-270444339/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-linkedin"></i>
              </a>
            </div>
          </div>

          <div className="profile-details-name">
            <span className="primary-text">
              {" "}
              Hello, I'm <span className="highlighted-text">Sua</span>
            </span>
          </div>

          <div className="profile-details-role">
            <span className="primary-text">
              <h1 style={{ fontWeight: 600 }}>
                <Typewriter
                  words={[
                    "Frontend Developer",
                    "Backend Developer",
                    "Mobile Developer",
                    "Full Stack Developer",
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1200}
                />
              </h1>
              <span className="profile-role-tagline">
                 Frontend, Backend, Mobile — delivering end-to-end, user-focused solutions.
              </span>
            </span>
          </div>
          <div className="profile-options">
            <button className="btn primary-btn"
            onClick={() => ScrollService.scrollHandler.scrollToHireMe()}
            > Hire Me </button>
            <a href="DuongVanSua_CV.pdf" download="DuongVanSua_CV.pdf">
              <button className="btn highlighted-btn">Get Resume</button>
            </a>
          </div>
        </div>
        <div className="profile-picture">
          <div className="profile-picture-background"></div>
        </div>
      </div>
    </div>
  );
}
