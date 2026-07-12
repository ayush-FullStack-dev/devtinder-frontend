import { FaAngleRight } from "react-icons/fa6";
import React from "react";
import { googleSans } from "@/assets/fonts/font.google";

type Props = {
  title: string;
  className?: string;
  onClick?: () => void;
  icon: React.ElementType;
  disabled?: boolean;
};

const ActionTile = ({
  title,
  className,
  onClick,
  icon: Icon,
  disabled = false,
}: Props) => {
  return (
    <div
      className={`group box-border flex h-15 items-center justify-between rounded-lg border-2 bg-transparent p-5 transition-all duration-300 ease-in-out text-[#545151] dark:text-white
        ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:border-[#6e68d2]"
        }
        ${className}`}
      onClick={!disabled ? onClick : undefined}
    >
      <div className="flex items-center gap-5">
        <Icon size={32} />

        <h1 className={`text-mid ${googleSans.className} font-bold`}>
          {title}
        </h1>
      </div>

      <FaAngleRight
        size={30}
        className={!disabled ? "group-hover:text-[#6e68d2]" : ""}
      />
    </div>
  );
};

export default ActionTile;
