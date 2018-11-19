const colors = {
  petrol: "#006567",
  lime: "#b0d400",
  white: "#ffffff",
  link: "#009090",
  dark: "#333333",
  gray: "#808080",
  blue: "#68c3fc",
  orange: "#ffa000",
  red: "#f33a58",
  black: "#000000",
  contentGrey: "#f2f2f2",
  backgroundGrey: "#e5e5e5",
  mediumGrey: "#d1d1d1",
  bordersGrey: "#b3b3b3"
};

const fontFamily = '"Xing Sans", Helvetica, Arial, sans-serif';

const fontSizes = [11, 13, 15, 18, 22, 26];

const fontWeights = [400, 600];

const lineHeights = [16, 18, 20, 24, 28, 32];

const buttons = {
  intent: {
    none: {},
    default: {},
    success: {},
    danger: {},
    warning: {}
  },
  appearance: {
    default: {
      borderRadius: "6px"
    },
    primary: {
      borderRadius: "6px"
    }
  },
  size: {
    small: {
      paddingRight: "8px",
      paddingLeft: "8px",
      height: "24px",
      fontSize: `${fontSizes[0]}px`
    },
    medium: {
      paddingRight: "16px",
      paddingLeft: "16px",
      height: "32px",
      fontSize: `${fontSizes[1]}px`
    },
    large: {
      paddingRight: "24px",
      paddingLeft: "24px",
      height: "48px",
      fontSize: `${fontSizes[2]}px`
    }
  }
};

export default {
  colors,
  fontFamily,
  fontSizes,
  fontWeights,
  lineHeights,
  buttons
};
