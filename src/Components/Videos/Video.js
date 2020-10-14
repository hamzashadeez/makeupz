import React from "react";
import "./style.css";

const Video = ({src, title}) => {
  return (
    <div className="videoContainer">
     
      
      <iframe
        src={src}
        // frameborder="0"
        allow="accelerometer; autoplay;"
        allowfullscreen
      ></iframe>
     
      <div id='title'>
        <h4>{title}</h4>
      </div>
    </div>
  );
};

export default Video;
