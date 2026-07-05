import jakarta from "@/assets/fonts/font.jakarta";
import poppins from "@/assets/fonts/font.poppins";

type props = {
  title: string;
  description: string;
  className?: string;
};

const AuthMethodHeader = ({ className, title, description }: props) => {
  return (
    <div className={`inline-flex flex-col ${className} justify-between `}>
      <h1 className={`text-mid ${poppins.className} font-bold`}>{title}</h1>
      <p
        className={`text-gray-400 ${jakarta.className} font-extrabold text-[13px] whitespace-nowrap`}
      >
        {description}
      </p>
    </div>
  );
};

export default AuthMethodHeader;
