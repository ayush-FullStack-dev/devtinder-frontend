import { FaAngleRight } from "react-icons/fa6";
import React from "react";
import { googleSans } from "@/assets/fonts/font.google";
import type { IconComponent } from "@/types/icon.type";

type Props = {
  title: string;
  className?: string;
  onClick?: () => void;
  icon: IconComponent;
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
      className={`group box-border w-full flex h-15 items-center justify-between rounded-lg border-2 border-border-primary bg-surface-secondary shadow-soft px-5 transition-all duration-300 ease-in-out text-foreground dark:text-foreground
        ${disabled
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer hover:border-primary/50 hover:bg-surface"
        }
        ${className}`}
      onClick={!disabled ? onClick : undefined}
    >
      <div className="flex items-center gap-5">
        <Icon size={32} className="hidden xs:block" />

        <h1 className={`text-mid ${googleSans.className} font-bold`}>
          {title}
        </h1>
      </div>

      <FaAngleRight
        size={30}
        className={!disabled ? "group-hover:text-primary" : ""}
      />
    </div>
  );
};

export default ActionTile;
