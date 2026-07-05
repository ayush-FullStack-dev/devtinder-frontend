import localFont from "next/font/local";

export const googleSans = localFont({
  src: [
    {
      path: "./GoogleSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./GoogleSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./GoogleSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-google-sans",
  display: "swap",
});

export const googleSansFlex = localFont({
  src: [
    {
      path: "./GoogleSansFlex_9pt-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./GoogleSansFlex_9pt-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./GoogleSansFlex_9pt-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./GoogleSansFlex_9pt-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-google-sans-flex",
  display: "swap",
});
