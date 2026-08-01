import defaultTheme from "tailwindcss/defaultTheme";

export const screens = {
  xxs: "300px",
  xs: "360px",
  mobile: "480px",
  ...defaultTheme.screens,
  "3xl": "1920px",
  "4xl": "2560px",
  "5xl": "3840px",
};
