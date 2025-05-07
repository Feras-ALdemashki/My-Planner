import React from "react";
import "../style/about.css";
import Lottie from "lottie-react";
import animation from "../assets/animation.json";

const About = () => {
  return (
    <>
      <div className="about">
        <Lottie className="lottie" animationData={animation} />
        <p>
          Event Planner is a user-friendly app designed to help you organize and
          manage your events with ease. Whether you're planning a meeting,
          celebration, or special occasion, our app allows you to create events
          with a specific date, name, location, and description. You can also
          add personalized notes to each event, ensuring that every detail is
          taken care of. With Event Planner, you can stay organized and never
          miss an important date again. Manage your events, keep track of
          important information, and plan your day with confidence.
        </p>
      </div>
    </>
  );
};

export default About;
