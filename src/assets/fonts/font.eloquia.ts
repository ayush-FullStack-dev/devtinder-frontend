import localFont from "next/font/local";

export const eloquia = localFont({
  src: [
    {
      path: "./EloquiaDisplay-ExtraLight.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./EloquiaDisplay-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-eloquia",
  display: "swap",
});
