"use client";

import {
    type ButtonHTMLAttributes,
    type ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";

type PillButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    icon?: ReactNode;
    className?: string;
};

export const PillButton = ({
    children,
    icon,
    className,
    type = "button",
    ...props
}: PillButtonProps) => {
    return (
        <button
            {...props}
            type={type}
            className={twMerge(
                `
                group
                relative
                inline-flex
                w-fit
                max-w-full
                min-w-0
                shrink-0
                items-center
                justify-center
                gap-2
                overflow-visible
                rounded-full
                px-7
                py-3.5
                text-sm
                font-medium
                leading-none
                whitespace-nowrap
                select-none

                transition-all
                duration-300
                ease-out

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-black/20

                disabled:pointer-events-none
                disabled:cursor-not-allowed
                disabled:opacity-50

                before:pointer-events-none
                before:absolute
                before:-inset-1
                before:-z-10
                before:rounded-full
                before:bg-[linear-gradient(90deg,#6ea8ff,#9b8cff,#c4b5ff,#9b8cff,#6ea8ff)]
                before:opacity-0
                before:blur-md
                before:scale-x-100
                before:scale-y-90
                before:transition-all
                before:duration-500
                before:ease-out
                hover:before:opacity-100
                hover:before:scale-x-105
                hover:before:scale-y-100

                [&>span:first-child]:min-w-0
                [&>span:first-child]:truncate
                `,
                className
            )}
        >
            <span className="min-w-0 truncate text-[95%]">
                {children}
            </span>

            {icon && (
                <span
                    aria-hidden="true"
                    className="
                        flex
                        shrink-0
                        items-center
                        justify-center
                    "
                >
                    {icon}
                </span>
            )}
        </button>
    );
};