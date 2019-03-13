import React from "react";
import { Zoom, Slide, Fade } from "react-reveal";
import Img from "gatsby-image";
import chroma from "chroma-js";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import ProjectIcon from "./ProjectIcon";
import Device from "./Device";
import PlainFrame from "./PlainFrame";

import "./ProjectViewer.module.css";

const ProjectViewer = ({ project }) => {
  const backgroundColor = project.color || "#ccc";
  // See https://github.com/gka/chroma.js/issues/181#issuecomment-423884867
  const isDarkBackground = chroma(backgroundColor).get("lab.l") < 80;

  return (
    <div
      className="js-color-stop"
      data-background-color={backgroundColor}
      styleName="snap"
      style={{ height: "100vh" }}
    >
      <div styleName="project">
        <div styleName={classNames("scroll", { dark: !isDarkBackground })}>
          Scroll <FontAwesomeIcon styleName="arrow" icon={faArrowRight} />
        </div>
        <div styleName="inner-container">
          <div styleName="background">
            <Slide right>
              <div
                styleName={classNames("background-text", {
                  dark: !isDarkBackground,
                })}
              >
                {project.name}
              </div>
            </Slide>
            <div styleName="background-banner" />
          </div>
          <div styleName="slide first-slide">
            <Fade bottom>
              <h2 styleName={classNames("title", { dark: !isDarkBackground })}>
                {project.name}
              </h2>
            </Fade>

            <Slide left>
              <div styleName="icon-container">
                <ProjectIcon
                  icon={project.icon}
                  prerendered={project.prerenderedIcon}
                />
                <p styleName="description">{project.description}</p>
              </div>
            </Slide>
            <Fade right>
              <ul
                styleName={classNames("keywords", { dark: !isDarkBackground })}
              >
                {project.keywords.map(keyword => (
                  <li>{keyword}</li>
                ))}
              </ul>
            </Fade>
          </div>
          {project.screenshots && (
            <Slide right>
              <div />
              {project.screenshots.map(({ device, image }) => {
                let ImgContainer;
                if (device === "none") {
                  ImgContainer = PlainFrame;
                } else {
                  ImgContainer = Device;
                }

                const {
                  aspectRatio,
                  presentationWidth,
                  presentationHeight,
                } = image.childImageSharp.fluid;

                return (
                  <div key={image.id} styleName="slide">
                    <ImgContainer
                      device={device}
                      landscape={aspectRatio > 1}
                      aspectRatio={aspectRatio}
                    >
                      <Img
                        fluid={{
                          ...image.childImageSharp.fluid,
                          // Hint the best image size to use
                          // default assumes 100vw which is wrong for us and ends up loading a version that's too big/heavy
                          sizes: `(min-aspect-ratio: ${presentationWidth}/${presentationHeight}) calc(80vh * ${aspectRatio}), 90vw`,
                        }}
                        style={
                          {
                            // width: "100%",
                            // "box-shadow":
                            //   "0 40px 80px 0 rgba(0, 0, 0, 0.2), 0 60px 200px 0 rgba(0, 0, 0, 0.19)",
                          }
                        }
                      />
                    </ImgContainer>
                  </div>
                );
              })}
            </Slide>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectViewer;
