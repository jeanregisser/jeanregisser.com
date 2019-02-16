import React from "react";

import "Devices.css/assets/devices.min.css";

import "./Device.css";

const SCALE = 0.3;

const IPhoneX = ({ children }) => (
  <>
    <div className="notch">
      <div className="camera" />
      <div className="speaker" />
    </div>
    <div className="top-bar" />
    <div className="sleep" />
    <div className="bottom-bar" />
    <div className="volume" />
    <div className="overflow">
      <div className="shadow shadow--tr" />
      <div className="shadow shadow--tl" />
      <div className="shadow shadow--br" />
      <div className="shadow shadow--bl" />
    </div>
    <div className="inner-shadow" />
    <div className="screen">{children}</div>
  </>
);

const IPhone8 = ({ children }) => (
  <>
    <div className="top-bar" />
    <div className="sleep" />
    <div className="volume" />
    <div className="camera" />
    <div className="sensor" />
    <div className="speaker" />
    <div className="screen">{children}</div>
    <div className="home" />
    <div className="bottom-bar" />
  </>
);

const IPadMini = ({ children }) => (
  <>
    <div className="camera" />
    <div className="screen">{children}</div>
    <div className="home" />
  </>
);

const Device = ({ device, landscape, children }) => {
  let DeviceContent;

  switch (device) {
    case "iphone-x":
      DeviceContent = IPhoneX;
      break;
    case "ipad":
      DeviceContent = IPadMini;
    default:
      DeviceContent = IPhone8;
      break;
  }

  return (
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
        <DeviceContent>{children}</DeviceContent>
      </div>
    </div>
  );
};

export default Device;
