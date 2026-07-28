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
      className={`flex gap-2 items-center justify-center text-gray-400 hover:text-[#3498db] cursor-pointer ${className} `}
      onClick={onClick}
    >
      <ArrowLeft  size={20} />
      <p className={`${googleSansFlex.className}`}>{text !== undefined ? text : "Back"}</p>
    </button>
  );
};

export default BackButton;
