import React from "react";

import "Devices.css/assets/devices.min.css";

import "./Device.css";

const SCALE = 0.3;

const Device = ({ device, landscape, children }) => (
  <div
    className="marvel-device-container"
    // style={{
    //   width: 423 * SCALE,
    //   height: 877 * SCALE,
    // }}
  >
    <div
      className={`marvel-device ${device || "iphone8"} silver ${
        landscape ? "landscape" : ""
      }`}
      style={
        {
          // fontSize: "1px",
          // transform: `scale(${SCALE})`,
          // transformOrigin: "0 0",
          // height: "300px",
          // width: "200px",
        }
      }
    >
      <div className="top-bar" />
      <div className="sleep" />
      <div className="volume" />
      <div className="camera" />
      <div className="sensor" />
      <div className="speaker" />
      <div className="screen">{children}</div>
      <div className="home" />
      <div className="bottom-bar" />
    </div>
  </div>
);

export default Device;
