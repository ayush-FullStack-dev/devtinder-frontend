"use client";

import React, { useRef } from "react";
import type { IconType } from "react-icons";
import { FaArrowRight } from "react-icons/fa6";
import { Loader2 } from "lucide-react";
import { twMerge } from "tailwind-merge";

type HoverFillButtonProps = {
    text: string;
    icon?: IconType;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
};

const HoverFillButton = ({
    text,
    icon,
    onClick,
    className,
    type = "button",
    disabled = false,
}: HoverFillButtonProps) => {
    const Icon = icon || FaArrowRight;
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

        cursor-pointer
        disabled:cursor-not-allowed
        disabled:opacity-50
        `,
                className
            )}
        >
            {!disabled && (
                <span
                    className="
                absolute inset-y-0 left-0
                w-full
                -translate-x-full

                flex items-center justify-center
                bg-green-brand

                transition-transform
                duration-300
                ease-out

                group-hover:translate-x-0
            "
                >
                    <span
                        className="
                    absolute
                    left-3
                    top-1/2
                    flex items-center gap-2
                    -translate-y-1/2

                    text-white
                    whitespace-nowrap

                    transition-all
                    duration-300
                    ease-out

                    group-hover:left-1/2
                    group-hover:-translate-x-1/2
                "
                    >
                        <span
                            className="
                        size-3
                        rounded-full
                        bg-green-brand

                        transition-all
                        duration-300
                        ease-out

                        group-hover:scale-0
                        group-hover:opacity-0
                    "
                        />

                        <span
                            className="
                        -translate-x-2
                        opacity-0

                        transition-all
                        duration-300
                        ease-out
                        delay-75

                        group-hover:translate-x-0
                        group-hover:opacity-100
                    "
                        >
                            {text}
                        </span>

                        <Icon
                            className="
                        size-4
                        -translate-x-2
                        opacity-0

                        transition-all
                        duration-300
                        ease-out
                        delay-100

                        group-hover:translate-x-0
                        group-hover:opacity-100
                    "
                        />
                    </span>
                </span>
            )}

            <span
                className={`
            absolute z-10
            flex items-center gap-2

            transition-all
            duration-300
            ease-out

            ${!disabled
                        ? "group-hover:-translate-x-2 group-hover:opacity-0"
                        : ""
                    }
        `}
            >
                <span>{text}</span>
            </span>
        </button>
    );
};

export default HoverFillButton;