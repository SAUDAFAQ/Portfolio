import "./styles/About.css";
import { about, profile } from "../data/portfolio";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About me</h3>
        <p className="para">{about.body}</p>
        <p className="para about-meta">{profile.locationNote}</p>
      </div>
    </div>
  );
};

export default About;
