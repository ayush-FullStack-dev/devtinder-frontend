import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
  variable: "--font-poppins",
});

export default poppins;