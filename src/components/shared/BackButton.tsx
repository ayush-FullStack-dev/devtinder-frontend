import jakarta from "@/assets/fonts/font.jakarta";
import { ArrowLeft } from "lucide-react";

type props = {
  onClick?: () => void
  className?: string;
};

const BackButton = ({onClick, className }: props) => {
  return (
    <button
      type="button"
      className={`flex gap-3 items-center justify-center text-gray-400 hover:text-[#3498db] cursor-pointer ${className} `}
      onClick={onClick}
    >
      <ArrowLeft size={20} />
      <p className={`${jakarta.className}`}>Back</p>
    </button>
  );
};

export default BackButton;
