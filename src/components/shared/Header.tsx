import jakarta from "@/assets/fonts/font.jakarta";
import poppins from "@/assets/fonts/font.poppins";

type props = {
  title: string;
  description: string;
  className?: string;
};

const Header = ({ className, title, description }: props) => {
  return (
    <div
      className={`w-80 h-20 inline-flex flex-col ${className} justify-between `}
    >
      <h1 className={`text-xl ${poppins.className} font-bold`}>{title}</h1>
      <p
        className={`whitespace-pre-line text-gray-400 ${jakarta.className} font-extrabold text-[13px]`}
      >
        {description}
      </p>
    </div>
  );
};

export default Header;
