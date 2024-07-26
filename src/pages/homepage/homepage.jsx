import React from "react";
import "./homepage.scss";

import { useNavigate } from "react-router-dom";

const Homepage = ({ categori }) => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <div className="firstframe">
        <div className="side1">
          <h1>Buy The Best Products</h1>
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
            >
              {e.name == "Womens" || e.name == "Mens" ? (
                <h2 style={{ color: "black" }}>{e.name}</h2>
              ) : (
                <h2>{e.name}</h2>
              )}
              <div className="image">
                <div className="backgroundTitle">
                  {e.name == "Womens" || e.name == "Mens" ? (
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
