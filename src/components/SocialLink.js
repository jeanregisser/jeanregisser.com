import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./SocialLink.module.css";

const SocialLink = ({ name, href, icon }) => {
  return (
    <a styleName="link" href={href}>
      <FontAwesomeIcon icon={icon} />
      <span styleName="title">{name}</span>
    </a>
  );
};

export default SocialLink;
