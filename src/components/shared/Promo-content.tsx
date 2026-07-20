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
        className={`
      ${poppins.className}

      whitespace-pre-line
      tracking-wide

      text-2xl
      lg:text-3xl
      xl:text-4xl

      max-w-70
      lg:max-w-90
      xl:max-w-105

      ml-0
    `}
      >
        {title}
      </h1>

      <p
        className={`
      ${jakarta.className}

      text-gray-400
      font-bold

      text-sm
      lg:text-base

      max-w-60
      lg:max-w-[320px]
      xl:max-w-95

      leading-relaxed
    `}
      >
        {description}
      </p>
    </div>
  );
};

export default PromoContent;
