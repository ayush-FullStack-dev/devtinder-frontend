import { FaAngleRight } from "react-icons/fa6";
import React from "react";
import { googleSans } from "@/assets/fonts/font.google";

type props = {
  title: string;
  className?: string;
  icon: React.ElementType;
  onClick?: () => void;
};

const ActionTile = ({ title, className, onClick, icon: Icon }: props) => {
  return (
    <div
      className={`group  box-border flex h-15 w-130 items-center justify-between rounded-lg border-2 bg-transparent p-5 ${className} hover:border-[#6e68d2] transition-all duration-300 ease-in-out   text-[#545151] dark:text-white`}
      onClick={onClick}
    >
      <div className="flex items-center gap-5">
        <Icon size={32} />
        <div className={`inline-flex flex-col ${className} justify-between `}>
          <h1 className={`text-mid ${googleSans.className} font-bold`}>
            {title}
          </h1>
        </div>
      </div>

      <FaAngleRight size={30} className="group-hover:text-[#6e68d2]" />
    </div>
  );
};

export default ActionTile;
