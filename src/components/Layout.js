import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import { isIOS } from "react-device-detect";
import vhCheck from "vh-check";

// This ensures that the icon CSS is loaded immediately before attempting to render icons
// See https://github.com/FortAwesome/react-fontawesome/issues/134
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import "./Layout.css";

const Layout = ({ children }) => {
  useEffect(() => {
    // Workaround Chrome scroll snap not working with font-face
    // See https://stackoverflow.com/questions/52801404/font-face-stops-scroll-snap-points-from-working
    // Also disable scroll snap on iOS because of the visual glitch when combined with an animation
    // See https://stackoverflow.com/questions/52989070/css-scroll-snap-visual-glitches-on-ios-when-programmatically-setting-style-on
    setTimeout(() => {
      !isIOS && document.body.classList.add("snap");
    }, 0);

    // iOS / Android viewport workaround
    vhCheck();
  });

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <div
            style={
              {
                // margin: `0 auto`,
                // maxWidth: 960,
                // padding: `0px 1.0875rem 1.45rem`,
                // paddingTop: 0,
              }
            }
          >
            <main>{children}</main>
            <footer>
              © {new Date().getFullYear()} Jean Regisser, built with&nbsp;
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </footer>
          </div>
        </>
      )}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
