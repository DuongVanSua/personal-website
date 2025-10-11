import React, { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Typewriter } from "react-simple-typewriter";
import imgBack from "../../../src/images/mailz.jpeg";
import load1 from "../../../src/images/load2.gif";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import "./ContactMe.css";

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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [banner, setBanner] = useState("");
  const [bool, setBool] = useState(false); // spinner

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleMessage = (e) => setMessage(e.target.value);

  // đơn giản, đủ dùng
  const isValidEmail = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).toLowerCase());

  const submitForm = async (e) => {
    e.preventDefault();

    // 1) Kiểm tra trước, KHÔNG bật spinner, KHÔNG gọi API
    if (!name.trim() || !email.trim() || !message.trim()) {
      const msg = "please fill all the fields";
      setBanner(msg);
      toast.error(msg);
      return;
    }
    if (!isValidEmail(email)) {
      const msg = "please provide a valid email";
      setBanner(msg);
      toast.error(msg);
      return;
    }

    // 2) Đã hợp lệ → bật spinner, gọi API
    setBool(true);
    try {
      const res = await axios.post(`/contact`, { name, email, message });

      if (res.status === 200) {
        setBanner(res.data?.msg || "Sent successfully");
        toast.success(res.data?.msg || "Sent successfully");

        // reset form
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setBanner(res.data?.msg || "Something went wrong");
        toast.error(res.data?.msg || "Something went wrong");
      }
    } catch (error) {
      const msg =
        error?.response?.data?.msg ||
        error?.message ||
        "Server error. Please try again.";
      setBanner(msg);
      toast.error(msg);
    } finally {
      setBool(false); // 3) Tắt spinner
    }
  };

  return (
    <div className="main-container fade-in" id={props.id || "ContactMe"}>
      <ScreenHeading subHeading="Lets Keep In Touch" title="Contact Me" />
      <div className="central-form">
        <div className="col">
          <h2 className="title" style={{ fontWeight: 600 }}>
            <Typewriter
              words={[
                "Get In Touch Email 📧",
                "Let's Connect and Collaborate 🤝",
                "Reach Out for Internship or Projects 💼",
              ]}
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
            <img src={imgBack} alt="mail background" />
          </div>

          <form onSubmit={submitForm}>
            <p>{banner}</p>

            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              onChange={handleName}
              value={name}
              disabled={bool}
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              onChange={handleEmail}
              value={email}
              disabled={bool}
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              onChange={handleMessage}
              value={message}
              disabled={bool}
            />

            <div className="send-btn">
              <button type="submit" disabled={bool}>
                send <i className="fa fa-paper-plane" />
                {bool ? (
                  <b className="load">
                    <img src={load1} alt="loading animation" />
                  </b>
                ) : null}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="footer-note">
        <p>© {new Date().getFullYear()} by DVS-Dev</p>
      </div>
    </div>
  );
}
