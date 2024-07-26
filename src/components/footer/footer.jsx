import "./footer.scss";

import React from "react";

const Footer = () => {
  return (
    <>
      <div className="footer_container">
        <div className="top_link_box">
          <ul>
            <li style={{ fontWeight: "bold" }}>Program</li>
            <li>Corporate</li>
            <li>One to One</li>
            <li>Consulting</li>
          </ul>
          <ul>
            <li style={{ fontWeight: "bold" }}>Service</li>
            <li>Training</li>
            <li>Coaching</li>
            <li>Consulting</li>
          </ul>
          <ul>
            <li style={{ fontWeight: "bold" }}>Contact</li>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>

          <div className="searech">
            <p>Newsletter</p>
            <div className="search_box">
                <input type="text" />
                <div className="button">Subscribe</div>
            </div>
            <p>Mobile:0123456789</p>
            <p>Email:suman@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
