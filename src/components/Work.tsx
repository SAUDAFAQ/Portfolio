import {
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { projects } from "../data/portfolio";
import { scrollToSection } from "../utils/scrollToSection";

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setViewportWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Selected <span>work</span>
        </h2>

        <div className="carousel-wrapper">
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          <div className="carousel-track-container" ref={viewportRef}>
            <div
              className="carousel-track"
              style={{
                transform:
                  viewportWidth > 0
                    ? `translateX(-${currentIndex * viewportWidth}px)`
                    : undefined,
              }}
            >
              {projects.map((project, index) => (
                <div
                  className="carousel-slide"
                  key={project.title}
                  style={
                    viewportWidth > 0
                      ? { flex: `0 0 ${viewportWidth}px` }
                      : undefined
                  }
                >
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">{project.category}</p>
                        <div className="carousel-tools">
                          <span className="tools-label">Stack</span>
                          <p>{project.stack}</p>
                        </div>
                        <ul className="carousel-bullets">
                          {project.bullets.map((b, i) => (
                            <li key={`${project.title}-b-${i}`}>{b}</li>
                          ))}
                        </ul>
                        <div className="carousel-cta">
                          {project.link ? (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noreferrer"
                              className="carousel-cta-link"
                              data-cursor="disable"
                            >
                              {project.ctaLabel ?? "View project"}
                            </a>
                          ) : (
                            <button
                              type="button"
                              className="carousel-cta-link carousel-cta-button"
                              data-cursor="disable"
                              onClick={(e) => scrollToSection("#contact", e)}
                            >
                              {project.ctaLabel ?? "Contact me"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage
                        image={project.image}
                        alt={project.title}
                        link={project.link ?? undefined}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={`work-dot-${index}`}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
