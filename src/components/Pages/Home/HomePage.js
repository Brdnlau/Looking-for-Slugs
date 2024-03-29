import React from "react";
import customIcon from "../../images/flippedLFS.png";
import "./HomePage.css";
import LoginButton from "../../Buttons/LoginButton";
import NavbarHome from "../../Navbar/Navbar";
import { auth } from "../../../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  if (user) {
    navigate("/dashboard");
  }

  return (
    <div>
      <NavbarHome />
      <div className="split-parent">
        <div className="split">
          <h1>The New Best Way to Organize Pick-Up Sports</h1>
          <div className="line"></div>
          <p>
            Looking for Slugs (LFS) allows you to seamlessly view and create
            sport events. You can become an organizer and create and monitor
            your own events, or become an attendee, someone looking to get into
            a game. Getting people together to play has never been easier.
          </p>
          <LoginButton class="loginbutton" text="Get Started" />
        </div>
        <div className="split">
          <img src={customIcon} alt="Slug"></img>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
