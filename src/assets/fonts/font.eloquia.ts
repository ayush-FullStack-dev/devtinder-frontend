import localFont from "next/font/local";

export const eloquia = localFont({
  src: [
    {
      path: "./ttf/EloquiaDisplay-ExtraLight.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./ttf/EloquiaDisplay-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-eloquia",
  display: "swap",
});
