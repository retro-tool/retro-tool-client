const primary = {
  white: "#fffffe",
  petrol: "#006567",
  lime: "#b0d400",
  dark: "#333333",
  grey: "#808080",
  blue: "#68c3fc",
  orange: "#ffa000",
  red: "#e45858",
  violet: "#4a61e3",
  contentGrey: "#f2f2f2",
  borderGrey: "#e5e5e5",
  mediumGrey: "#d1d1d1",
  secondaryGrey: "#b3b3b3"
};

const colors = {
  ...primary,
  link: primary.violet
};

const space = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64];

const breakpoints = ["640px", "768px", "1024px", "1200px"];

const fontFamily =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

const fontSizes = [0, 12, 14, 16, 18, 22, 26];

const fontWeights = [400, 600];

const lineHeights = [0, 1.45, 1.38, 1.33, 1.33, 1.27, 1.23];

const shadows = ["0 2px 2px rgba(0, 0, 0, 0.16)"];

const radii = ["3px", "4px"];

const text = {
  base: {
    fontSize: fontSizes[2],
    lineHeight: lineHeights[2]
  },
  title: {
    fontSize: fontSizes[4],
    lineHeight: lineHeights[4]
  }
};

export default {
  breakpoints,
  colors,
  fontFamily,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  shadows,
  space,
  text
};
