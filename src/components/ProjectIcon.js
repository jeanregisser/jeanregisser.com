import React from "react";
import Img from "gatsby-image";
import classNames from "classnames";

import "./ProjectIcon.module.css";

const ProjectIcon = ({ icon, prerendered }) =>
  icon && (
    <Img
      fluid={icon.childImageSharp.fluid}
      styleName={classNames("container", {
        rounded: !prerendered,
        prerendered,
      })}
      // This is needed for Safari, otherwise drop-shadow is clipped
      style={{ overflow: prerendered ? "visible" : "hidden" }}
      imgStyle={{ objectFit: "contain" }}
    />
  );

export default ProjectIcon;
