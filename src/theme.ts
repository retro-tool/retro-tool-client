const colors = {
  petrol: "#006567",
  lime: "#b0d400",
  white: "#ffffff",
  link: "#009090",
  dark: "#333333",
  grey: "#808080",
  blue: "#68c3fc",
  orange: "#ffa000",
  red: "#f33a58",
  black: "#000000",
  contentGrey: "#f2f2f2",
  borderGrey: "#e5e5e5",
  mediumGrey: "#d1d1d1",
  borderDarkGrey: "#b3b3b3"
};

const space = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64];

const breakpoints = [640, 768, 1024, 1200];

const fontFamily = '"Xing Sans", Helvetica, Arial, sans-serif';

const fontSizes = [11, 13, 15, 18, 22, 26];

const fontWeights = [400, 600];

const lineHeights = [1.45, 1.38, 1.33, 1.33, 1.27, 1.23];

const text = {
  base: {
    fontSize: fontSizes[2],
    lineHeight: lineHeights[2]
  },
  title: {
    fontSize: fontSizes[3],
    lineHeight: lineHeights[3]
  }
};

export default {
  breakpoints,
  colors,
  fontFamily,
  fontSizes,
  fontWeights,
  lineHeights,
  text,
  space
};
