"use client"

import React, { useRef } from "react";
import type { IconType } from "react-icons";
import { FaArrowRight } from "react-icons/fa6";
import { Loader2 } from "lucide-react";
import { twMerge } from "tailwind-merge";

type props = {
  text: string;
  icon?: IconType;
  onClick?: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit" | "reset";
  className?: string;
  disbaled?: boolean;
  disbaleText?: string;
  showIcon?: boolean
};

const PrimaryButton = ({
  text,
  icon,
  onClick,
  className,
  btnType = "button",
  disbaled = false,
  disbaleText = "Checking...",
  onKeyDown = () => { },
  showIcon = true
}: props) => {
  const Icon = icon || FaArrowRight;
  const pressStartTime = useRef<number>(0);

  const pressEffect = (e: React.MouseEvent<HTMLButtonElement>): void => {
    pressStartTime.current = Date.now();

    const style = e.currentTarget.style;
    style.transform = "scale(0.96)";
    style.transition = "transform 0.2s linear";
  };

  const unpressEffect = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (!pressStartTime.current) return;

    const pressDuration = Date.now() - pressStartTime.current;
    pressStartTime.current = 0;

    const style = e.currentTarget.style;
    style.transform = "scale(1)";
    style.transition =
      pressDuration > 150
        ? "transform 0.4s ease-in-out"
        : "transform 0.8s ease-in-out";
  };

  return (
    <button
      type={btnType}
      className={twMerge(
        `
      box-border inline-flex h-14 items-center rounded-lg
      bg-[#1d845c]
      text-lg text-white
      transition-all duration-300 ease-out
      text-shadow-white
      ${disbaled
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer hover:opacity-90 active:scale-[0.98]"
        }
    `,
        className
      )}
    >
      <p className="font-extrabold flex-1 text-center tracking-wide">
        {disbaled ? disbaleText : text}
      </p>

      {disbaled
        ? showIcon && (
          <Loader2 className="hidden xs:inline animate-spin mr-4" />
        )
        : showIcon && (
          <Icon size="25" className="hidden xs:inline ml-auto mr-4" />
        )}
    </button>
  );
};

export default PrimaryButton;
