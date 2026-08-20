"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { FaArrowRight } from "react-icons/fa6";
import type { IconType } from "react-icons";

type AnimatedButtonProps = {
    text: string;
    icon?: IconType;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
};

const AnimatedButton = ({
    text,
    icon: Icon = FaArrowRight,
    className,
    onClick,
    type = "button",
    disabled = false,
}: AnimatedButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={twMerge(
                `
          group relative inline-flex
          h-10 w-25
          items-center justify-center
          overflow-hidden
          rounded-2xl

          border border-green-primary
          bg-transparent

        text-white

          transition-all duration-300 ease-out

          hover:bg-green-brand
          hover:border-green-brand

          disabled:cursor-not-allowed
          disabled:opacity-50
        `,
                className
            )}
        >
            {/* Text */}
            <span
                className="
          absolute
          flex items-center justify-center
          transition-all duration-300 ease-out
          group-hover:translate-x-8
          group-hover:opacity-0
        "
            >
                {text}
            </span>

            {/* Icon */}
            <Icon
                size={18}
                className="
          absolute
          translate-x-8
          opacity-0

          transition-all
          duration-300
          ease-out

          group-hover:translate-x-0
          group-hover:opacity-100
        "
            />
        </button>
    );
};

export default AnimatedButton;