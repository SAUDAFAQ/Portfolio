import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { profile } from "../data/portfolio";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href={`mailto:${profile.email}`}
                data-cursor="disable"
              >
                {profile.email}
              </a>
            </p>
            <h4>Education</h4>
            <p>
              MSc Computer Science, University of Paderborn — 2019–2023
            </p>
            <p>
              BSc Computer Science, Bahria University — 2014–2018
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/SAUDAFAQ"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/saud-bin-afaq-25066b133/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
           
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Saud Afaq</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
