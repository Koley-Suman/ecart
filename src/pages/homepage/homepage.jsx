import React, { useEffect, useRef } from "react";
import "./homepage.scss";
import { useNavigate } from "react-router-dom";
import Anime_text from "./animation_text/animation_text";

const Homepage = ({ categori }) => {
  const navigate = useNavigate();
  const boxRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1, // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible'); // Add 'visible' class to trigger animation
          observer.unobserve(entry.target); // Stop observing once it's visible (animation runs once)
        }
      });
    }, observerOptions);

    // Map through refs and start observing each box, but ensure it's a valid DOM element
    boxRefs.current.forEach((box) => {
      if (box) {
        observer.observe(box);
      }
    });

    // Cleanup observer on unmount, check for valid DOM elements
    return () => {
      boxRefs.current.forEach((box) => {
        if (box) {
          observer.unobserve(box);
        }
      });
    };
  }, []);

  return (
    <div className="homepage">
      <div className="firstframe">
        <div className="side1">
          <Anime_text />
        </div>
        <div className="side2">
          <div className="shoping_model"></div>
        </div>
      </div>
      <div className="lastframe">
        {categori.map((e, i) => {
          return (
            <div
              className={`categories_card ${e.size} `}
              id={`${e.name}`}
              style={{ backgroundColor: `${e.background}` }}
              key={i}
              onClick={() => navigate(`categori/${e.name}`)}
              ref={(ele) => (boxRefs.current[i] = ele)}
            >
              {e.name === "Womens" || e.name === "Mens" ? (
                <h2 style={{ color: "black" }}>{e.name}</h2>
              ) : (
                <h2>{e.name}</h2>
              )}
              <div className="image">
                <div className="backgroundTitle">
                  {e.name === "Womens" || e.name === "Mens" ? (
                    <div style={{ color: `${e.color}` }}>
                      Best product for {e.name}
                    </div>
                  ) : (
                    <div style={{ color: `${e.color}` }}>
                      {e.name.toUpperCase()}
                    </div>
                  )}
                </div>
                <img src={e.imageurl} alt="" className={`${e.name}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Homepage;
