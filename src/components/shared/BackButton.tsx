import { googleSansFlex } from "@/assets/fonts/font.google";
import jakarta from "@/assets/fonts/font.jakarta";
import { ArrowLeft } from "lucide-react";

type props = {
  text?: string
  onClick?: () => void
  className?: string;
};

const BackButton = ({ text, onClick, className }: props) => {
  return (
    <button
      type="button"
      className={`text-nav-link flex gap-2 items-center justify-center hover:text-nav-link-hover cursor-pointer transition-all duration-300 ease-in-out ${className} `}
      onClick={onClick}
    >
      <ArrowLeft size={20} />
      <p className={`${googleSansFlex.className}`}>{text !== undefined ? text : "Back"}</p>
    </button>
  );
};

export default BackButton;
