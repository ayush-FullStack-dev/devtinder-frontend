import localFont from "next/font/local";

export const helveticaNow = localFont({
  src: [
    {
      path: "./ttf/HelveticaNowDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./ttf/HelveticaNowDisplay-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-helvetica-now",
  display: "swap",
});
   