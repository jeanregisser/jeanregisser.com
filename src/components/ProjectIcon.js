import React from "react";
import Img from "gatsby-image";

import "./ProjectIcon.module.css";

const ProjectIcon = ({ icon }) =>
  icon && <Img fixed={icon.childImageSharp.fixed} styleName="container" />;

export default ProjectIcon;
