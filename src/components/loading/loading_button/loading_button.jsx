import React from "react";
import "./loading_button.scss";

const Loading_button = () => {
  return (
    <div>
      <button type="button" className="button button--loading">
        {/* <span className="button__text">Processing...</span> */}
      </button>
    </div>
  );
};

export default Loading_button;
