const primary = {
  white: "#fffffe",
  black: "#010101",
  petrol: "#006567",
  lime: "#b0d400",
  dark: "#333333",
  grey: "#808080",
  blue: "#68c3fc",
  orange: "#ffa000",
  red: "#e45858",
  violet: "hsl(231, 73%, 59%)",
  violetDark: "hsl(231, 73%, 19%)",
  contentGrey: "#f2f2f2",
  borderGrey: "#e5e5e5",
  mediumGrey: "#d1d1d1",
  secondaryGrey: "#b3b3b3"
};

const colors = {
  ...primary,
  link: primary.violet,
  white70: "rgba(255,255,255,0.7)"
};

const space = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 88, 100];

const breakpoints = ["640px", "768px", "1024px", "1200px", "1400px"];

const fontFamily =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

const fontSizes = [0, 12, 14, 16, 18, 22, 26, 36, 46, 56, 66];

const fontWeights = [400, 600];

const lineHeights = [0, 1.45, 1.38, 1.33, 1.33, 1.27, 1.23, 1.15, 1.8];

const shadows = ["0 2px 2px rgba(0, 0, 0, 0.16)"];

const radii = ["3px", "4px"];

const textStyles = {
  base: {
    fontSize: fontSizes[2],
    lineHeight: lineHeights[2]
  },
  title: {
    fontSize: fontSizes[4],
    lineHeight: lineHeights[4]
  },
  landingBase: {
    fontSize: fontSizes[3],
    lineHeight: lineHeights[8]
  },
  landingHighlightsTitle: {
    fontSize: fontSizes[5],
    letterSpacing: "-0.4px"
  },
  landingHighlightsText: {
    color: colors.white70,
    fontSize: fontSizes[3],
    lineHeight: lineHeights[8]
  },
  landingHowtoStep: {
    color: colors.violet,
    fontSize: fontSizes[2],
    textTransform: "uppercase",
    letterSpacing: "0.4px",
    fontWeight: "normal"
  }
};

export const buttons = {
  primary: {
    color: colors.white,
    background: colors.violet,
    fontSize: fontSizes[2],
    borderRadius: radii[0],
    height: 36,
    paddingLeft: space[4],
    paddingRight: space[4]
  },
  secondary: {
    color: colors.white,
    background: colors.mediumGrey,
    fontSize: fontSizes[2],
    borderRadius: radii[0],
    height: 36,
    paddingLeft: space[4],
    paddingRight: space[4]
  },
  landingPrimary: {
    color: colors.white,
    background: colors.violet,
    borderRadius: radii[1],
    height: 56
  },
  landingSecondary: {
    color: colors.dark,
    background: "transparent",
    height: 56,
    border: `1px solid ${colors.secondaryGrey}`,
    borderRadius: radii[1]
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
  textStyles,
  buttons
};
