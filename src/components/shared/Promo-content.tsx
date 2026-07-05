import jakarta from "@/assets/fonts/font.jakarta";
import poppins from "@/assets/fonts/font.poppins";
import React from "react";

type Props = {
  title: React.ReactNode;
  description: string;
  className?: string;
};

const PromoContent = ({ title, description, className }: Props) => {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <h1
        className={`${poppins.className} whitespace-pre-line tracking-widest text-2xl w-70 -ml-1`}
      >
        {title}
      </h1>
      <p
        className={`text-gray-400 ${jakarta.className} font-extrabold text-[15px] w-60`}
      >
        {description}
      </p>
    </div>
  );
};

export default PromoContent;
