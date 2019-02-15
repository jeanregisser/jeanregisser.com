import React from "react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
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
  const projects = data.allProjectsJson.edges;

  // console.log("==projects", projects);

  return (
    <Layout>
      <SEO
        title="Home"
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
          data-background-color={"lightgray"}
          styleName="wrapper"
          style={{ height: "100vh" }}
        >
          <div styleName="header">
            <h1 styleName="fade-top">jean regisser</h1>
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
    allProjectsJson {
      edges {
        node {
          id
          name
          color
          icon {
            childImageSharp {
              fixed(width: 150, height: 150) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          screenshots {
            device
            image {
              id
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
