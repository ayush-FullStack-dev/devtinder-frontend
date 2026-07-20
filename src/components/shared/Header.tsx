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
  className={`w-full max-w-80 sm:max-w-sm md:max-w-md inline-flex flex-col gap-2 ${className}`}
>
  <h1
    className={`${poppins.className} font-bold text-2xl sm:text-[26px] lg:text-[28px] leading-tight`}
  >
    {title}
  </h1>

  <p
    className={`${jakarta.className} whitespace-pre-line text-gray-400 font-medium text-sm sm:text-base leading-relaxed`}
  >
    {description}
  </p>
</div>
  );
};

export default Header;
