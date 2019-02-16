import React from "react";

import "./PlainFrame.module.css";

const PlainFrame = ({ aspectRatio, children }) => {
  return (
    <div styleName="container" style={{ "--aspect-ratio": `${aspectRatio}` }}>
      {children}
    </div>
  );
};

export default PlainFrame;
