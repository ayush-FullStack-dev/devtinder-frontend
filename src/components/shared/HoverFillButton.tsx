"use client";

import React, { useState } from "react";
import type { IconType } from "react-icons";
import { FaArrowRight } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";

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
    className,
    onClick,
    type = "button",
    disabled = false,
}: HoverFillButtonProps) => {
    const Icon = icon || FaArrowRight;

    const [isHovered, setIsHovered] = useState(false);

    const fillVariants = {
        rest: {
            left: 12,
            top: "50%",
            width: 12,
            height: 12,
            x: 0,
            y: "-50%",
        },

        hover: {
            left: "50%",
            top: "50%",
            width: 150,
            height: 150,
            x: "-50%",
            y: "-50%",
        },
    };

    const labelVariants = {
        rest: {
            x: 0,
            opacity: 1,
        },

        hover: {
            x: -10,
            opacity: 0,
        },
    };

    const hoverLabelVariants = {
        rest: {
            x: -24,
            opacity: 0,
        },

        hover: {
            x: 0,
            opacity: 1,
        },
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            initial="rest"
            animate={isHovered ? "hover" : "rest"}
            onHoverStart={() => !disabled && setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
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
        cursor-pointer
        disabled:cursor-not-allowed
        disabled:opacity-50
        `,
                className
            )}
        >
            {!disabled && (
                <motion.span
                    variants={fillVariants}
                    transition={{
                        duration: 1.1,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                absolute
                z-20
                rounded-full
                bg-green-brand
            "
                />
            )}

            <motion.span
                variants={labelVariants}
                transition={{
                    duration: 0,
                }}
                className="
            relative z-10
            flex items-center gap-2
        "
            >
                {text}
            </motion.span>

            {!disabled && (
                <motion.span
                    variants={hoverLabelVariants}
                    transition={{
                        duration: isHovered ? 0.8 : 0,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                absolute z-30
                flex items-center gap-2
                whitespace-nowrap
            "
                >
                    <span>{text}</span>
                    <Icon className="size-4 shrink-0" />
                </motion.span>
            )}
        </motion.button>
    );
};

export default HoverFillButton;