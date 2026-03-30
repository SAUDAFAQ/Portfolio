import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { profile } from "../data/portfolio";

const Landing = ({ children }: PropsWithChildren) => {
  const [firstName, ...restName] = profile.name.split(" ");
  const lastName = restName.join(" ");

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello, I&apos;m</h2>
            <h1>
              {firstName.toUpperCase()}
              <br />
              <span>{lastName.toUpperCase()}</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>{profile.heroEyebrow}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Mobile</div>
              <div className="landing-h2-2">Developer</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Developer</div>
              <div className="landing-h2-info-1">Mobile</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
