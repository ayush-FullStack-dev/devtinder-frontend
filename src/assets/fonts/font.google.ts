import localFont from "next/font/local";

export const googleSans = localFont({
  src: [
    {
      path: "./ttf/GoogleSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./ttf/GoogleSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./ttf/GoogleSans-Bold.ttf",
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
      path: "./ttf/GoogleSansFlex_9pt-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./ttf/GoogleSansFlex_9pt-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./ttf/GoogleSansFlex_9pt-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./ttf/GoogleSansFlex_9pt-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-google-sans-flex",
  display: "swap",
});
