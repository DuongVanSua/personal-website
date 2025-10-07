import React, { useEffect, useCallback, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import imgBack from "../../../src/images/mailz.jpeg";
import load1 from "../../../src/images/load2.gif";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import './ContactMe.css'

export default function ContactMe(props) {
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

  const fadeInSubscription =
    ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [banner, setBanner] = useState("");
  const [bool, setBool] = useState(false);

  const handleName = (e) => {
  setName(e.target.value);
};

const handleEmail = (e) => {
  setEmail(e.target.value);
};

const handleMessage = (e) => {
  setMessage(e.target.value);
};

console.log(name);

  return (
    <div className="main-container screen-container" id={props.id || ""}>
      <ScreenHeading subHeading="Lets Keep In Touch" title="Contact Me" />
      <div className="central-form">
        <div className="col">
          <h2 className="title" style={{ fontWeight: 600 }}>
            <Typewriter
              words={["Get In Touch Email"]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1200}
            />
          </h2>

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
        <div className="back-form">
          <div className="img-back">
            <h4>Send Your Email Here!</h4>
            <img src={imgBack} alt="image not found" />
          </div>
          <form>
            <p>{banner}</p>
            <label htmlFor="name">Name</label>
            <input type="text" 
            onChange={handleName}
            value={name}
            />

            <label htmlFor="email">Email</label>
            <input type="email"
            onChange={handleEmail}
            value={email}
             />

            <label htmlFor="message">Message</label>
            <textarea type="text"
            onChange={handleMessage}
            value={message}
            />

            <div className="send-btn">
              <button type="submit">
                send <i className="fa fa-paper-plane" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
