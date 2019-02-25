// Adapted from https://github.com/snipsco/react-scrolling-color-background/blob/f2a0592ec3781fc2f274f486024d24094299b6b3/src/index.js

import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import throttle from "lodash.throttle";
import chroma from "chroma-js";

let supportsPassive = false;
try {
  var opts = Object.defineProperty({}, "passive", {
    get: function() {
      supportsPassive = true;
    },
  });
  window.addEventListener("testPassive", null, opts);
  window.removeEventListener("testPassive", null, opts);
} catch (e) {}

// calcule the offset in pixels to top of the site,
// from a DOM element (el)
function getElementOffset(el) {
  let top = 0;
  let left = 0;

  // grab the offset of the element relative to it's parent,
  // then repeat with the parent relative to it's parent,
  // ... until we reach an element without parents.
  do {
    if (!isNaN(el.offsetTop)) {
      top += el.offsetTop;
    }
    if (!isNaN(el.offsetLeft)) {
      left += el.offsetLeft;
    }
    el = el.offsetParent;
  } while (el);

  return { top, left };
}

function getColorPositions({ selector, colorDataAttribute }) {
  // Workaround SSR
  if (typeof document === "undefined") {
    return [];
  }
  return Array.from(document.querySelectorAll(selector)).map(el => {
    return {
      rgbString: el.getAttribute(colorDataAttribute),
      startY: getElementOffset(el).top,
    };
  });
}

function useColorPositions({ selector, colorDataAttribute }) {
  const [colorPositions, setColorPositions] = useState(() =>
    getColorPositions({ selector, colorDataAttribute })
  );

  useEffect(() => {
    let handleResize = throttle(() => {
      setColorPositions(getColorPositions({ selector, colorDataAttribute }));
    }, 60);

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [selector, colorDataAttribute]);

  return colorPositions;
}

const ScrollingColorBackground = ({ selector, colorDataAttribute }) => {
  const colorPositions = useColorPositions({ selector, colorDataAttribute });

  useEffect(() => {
    let prevIndex;
    let prevRgbString;
    let handleScroll = throttle(() => {
      const yOffset = window.pageYOffset;

      // clamp nextIndex between 1 and the highest index in colorPositions
      const itemsCount = colorPositions.length;
      if (itemsCount === 0) {
        return;
      }
      let nextIndex = colorPositions.findIndex(
        ({ startY }) => startY > yOffset
      );
      if (nextIndex === -1) {
        // NOTE: if we scrolled past the last one; keep the color of the last one
        nextIndex = prevIndex === itemsCount - 1 ? itemsCount - 1 : 1;
      } else if (nextIndex === 0) {
        nextIndex = 1;
      }
      // save for checking next time
      prevIndex = nextIndex;

      const first = colorPositions[nextIndex - 1];
      const next = colorPositions[nextIndex];
      const distanceBetweenCovered = Math.max(
        0,
        Math.min(1, (yOffset - first.startY) / (next.startY - first.startY))
      );

      const rgbString = chroma
        .mix(first.rgbString, next.rgbString, distanceBetweenCovered)
        .css();

      if (rgbString !== prevRgbString) {
        prevRgbString = rgbString;
        document.body.style.backgroundColor = rgbString;
        const metaThemeColor = document.querySelector("meta[name=theme-color]");
        metaThemeColor.setAttribute("content", rgbString);
      }
    }, 60);

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      supportsPassive ? { passive: true } : false
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [colorPositions]);

  return null;
};

ScrollingColorBackground.propTypes = {
  className: PropTypes.string,
  // style: PropTypes.object.isRequired,
  // initialRgb: PropTypes.string.isRequired,
  selector: PropTypes.string.isRequired,
  colorDataAttribute: PropTypes.string.isRequired,
};

ScrollingColorBackground.defaultProps = {
  className: "scrolling-color-background",
  // style: {
  //   position: "fixed",
  //   top: "0px",
  //   left: "0px",
  //   bottom: "0px",
  //   right: "0px",
  // },
  // initialRgb: "rgb(0,0,0)",
  selector: "[data-background-color]",
  colorDataAttribute: "data-background-color",
};

export default ScrollingColorBackground;
