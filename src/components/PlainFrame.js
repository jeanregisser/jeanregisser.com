import React from "react";

import "./PlainFrame.module.css";

const PlainFrame = ({ aspectRatio, children }) => {
  return (
    <div styleName="container" style={{ width: `calc(80vh * ${aspectRatio})` }}>
      {children}
    </div>
  );
};

export default PlainFrame;
