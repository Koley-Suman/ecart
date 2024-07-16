import React from "react";
import './loading.scss'

const Loading = () => {
  return (
    <>
      <div className="loader-container">
        <div className="loader">
          <div className="inner-circle"></div>
        </div>
      </div>
    </>
  );
};

export default Loading;
