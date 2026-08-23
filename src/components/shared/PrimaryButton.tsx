"use client";

import React, { useRef } from "react";
import type { IconType } from "react-icons";
import { FaArrowRight } from "react-icons/fa6";
import { Loader2 } from "lucide-react";
import { twMerge } from "tailwind-merge";

type Props = {
  text: string;
  icon?: IconType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit" | "reset";
  className?: string;
  disbaled?: boolean;
  disbaleText?: string;
  showIcon?: boolean;
};

const PrimaryButton = ({
  text,
  icon,
  onClick,
  className,
  btnType = "button",
  disbaled = false,
  disbaleText = "Checking...",
  onKeyDown,
  showIcon = true,
}: Props) => {
  const Icon = icon || FaArrowRight;
  const pressStartTime = useRef<number | null>(null);

  const handlePressStart = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (disbaled) return;

    pressStartTime.current = Date.now();

    const style = e.currentTarget.style;

    style.transform = "scale(0.96)";
    style.transition = "transform 0.2s linear";
  };

  const handlePressEnd = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!pressStartTime.current) return;

    const pressDuration =
      Date.now() - pressStartTime.current;

    pressStartTime.current = null;

    const style = e.currentTarget.style;

    style.transform = "scale(1)";
    style.transition =
      pressDuration > 150
        ? "transform 0.4s ease-in-out"
        : "transform 0.8s ease-in-out";
  };

  const handleKeyDown: React.KeyboardEventHandler<
    HTMLButtonElement
  > = (e) => {
    onKeyDown?.(e);
  };

  return (
    <button
      type={btnType}
      disabled={disbaled}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      className={twMerge(
        `
          box-border
          inline-flex
          h-14
          items-center
          rounded-lg
          bg-[#1d845c]
          text-lg
          text-white
          text-shadow-white
          transition-all
          duration-300
          ease-out
          ${
            disbaled
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:opacity-90"
          }
        `,
        className
      )}
    >
      <p className="flex-1 text-center font-extrabold tracking-wide">
        {disbaled ? disbaleText : text}
      </p>

      {showIcon &&
        (disbaled ? (
          <Loader2 className="mr-4 hidden animate-spin xs:inline" />
        ) : (
          <Icon
            size={25}
            className="ml-auto mr-4 hidden xs:inline"
          />
        ))}
    </button>
  );
};

export default PrimaryButton;