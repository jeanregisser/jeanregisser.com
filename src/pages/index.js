import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import ScrollingColorBackground from "../components/ScrollingColorBackground";
import SocialLink from "../components/SocialLink";
import ProjectViewer from "../components/ProjectViewer";

import "./index.module.css";

const IndexPage = ({ data }) => {
  const projects = data.allProjectsYaml.edges;

  // console.log("==projects", projects);

  return (
    <Layout>
      <SEO
        keywords={[
          `jean regisser`,
          `portfolio`,
          `software`,
          `engineer`,
          `ios`,
          `android`,
          `mobile`,
          `react native`,
        ]}
      />
      <div
        style={{
          position: "relative",
        }}
      >
        <ScrollingColorBackground
          selector=".js-color-stop[data-background-color]"
          colorDataAttribute="data-background-color"
        />
        <div
          className="js-color-stop"
          data-background-color={"white"}
          styleName="wrapper"
          style={{ height: "100vh" }}
        >
          <div styleName="header">
            <div styleName="fade-top">
              <h1 styleName="title">jean regisser</h1>
              <p styleName="description">software engineer</p>
            </div>
            <div styleName="social-links fade-bottom">
              <SocialLink
                name="Email"
                icon={faEnvelope}
                href="mailto:jean.regisser@gmail.com"
              />
              <SocialLink
                name="Twitter"
                icon={faTwitter}
                href="https://twitter.com/jeanregisser"
              />
              <SocialLink
                name="GitHub"
                icon={faGithub}
                href="https://github.com/jeanregisser"
              />
              <SocialLink
                name="StackOverflow"
                icon={faStackOverflow}
                href="https://stackoverflow.com/users/158525/jean-regisser"
              />
              <SocialLink
                name="LinkedIn"
                icon={faLinkedin}
                href="https://www.linkedin.com/in/jeanregisser/"
              />
            </div>
            <FontAwesomeIcon styleName="chevron" icon={faChevronDown} />
          </div>
        </div>
        {projects.map(({ node }) => (
          <ProjectViewer key={node.id} project={node} />
        ))}
      </div>
    </Layout>
  );
};

export default IndexPage;

export const IndexQuery = graphql`
  query {
    allProjectsYaml {
      edges {
        node {
          id
          name
          color
          icon {
            childImageSharp {
              # Hint the best image size to use
              # default assumes 100vw which is wrong for us and ends up loading a version that's too big/heavy
              fluid(sizes: "16vh", maxWidth: 256) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
          prerenderedIcon
          description
          keywords
          screenshots {
            device
            image {
              id
              childImageSharp {
                fluid(toFormat: JPG, quality: 80) {
                  ...GatsbyImageSharpFluid_tracedSVG
                  presentationWidth
                  presentationHeight
                }
              }
            }
          }
        }
      }
    }
  }
`;
