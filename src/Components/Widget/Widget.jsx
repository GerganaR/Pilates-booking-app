import React from "react";
import background from "../../Assets/weights.png";

import "./Widget.css";

const Widget = ({ className = "", icon, title, text }) => {
  return (
    <div className="widget" style={{ backgroundImage: `url(${background})` }}>
      <div className={`widget-icon ${className}`}>{icon}</div>

      <div className="widget-text">{text}</div>
      <div className="widget-title">{title}</div>
    </div>
  );
};

export default Widget;
