import React from "react";

const Info = () => {
  return (
    <div className="about__info grid">
      <div className="about__box">
        <i className="bx bx-award about__icon"></i>
        <h3 className="about__title">Experience</h3>
        <span className="about__subtitle">2 Years</span>
      </div>

      <div className="about__box">
        <i className="bx bx-briefcase-alt about__icon"></i>
        <h3 className="about__title">Completed</h3>
        <span className="about__subtitle">7 + Projects</span>
      </div>

      <div className="about__box">
        <i className="bx bxs-graduation about__icon"></i>
        <h3 className="about__title">Graduation</h3>
        <span className="about__subtitle">March 2024</span>
      </div>
    </div>
  );
};

export default Info;
