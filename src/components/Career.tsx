import "./styles/Career.css";
import { career } from "../data/portfolio";

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          Career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {career.map((entry, index) => (
            <div className="career-info-box" key={`${entry.company}-${index}`}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{entry.role}</h4>
                  <h5>{entry.company}</h5>
                </div>
                <h3>{entry.period}</h3>
              </div>
              <p>{entry.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
