import type { ReactNode } from "react";

interface MacWindowFrameProps {
    children?: ReactNode;
    className?: string;
}

export default function MacWindowFrame({
    children,
    className = "",
}: MacWindowFrameProps) {
    return (
        <div
            className={`
                relative
                w-fit
                overflow-hidden
                rounded-[18px]
                border
                border-[#cfcfcf]
                bg-transparent
                shadow-[0_2px_8px_rgba(0,0,0,0.22)]
                dark:border-[#3a3a3a]
                dark:shadow-[0_2px_12px_rgba(0,0,0,0.5)]
                ${className}
            `}
        >
            <div
                className="
                    flex
                    h-11
                    w-full
                    items-center
                    border-b
                    border-[#d6d6d6]
                    bg-[#f5f5f5]
                    px-4
                    dark:border-[#3a3a3a]
                    dark:bg-[#1f1f1f]
                "
            >
                <div className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-[#ff5f57]" />
                    <span className="size-3 rounded-full bg-[#febc2e]" />
                    <span className="size-3 rounded-full bg-[#28c840]" />
                </div>
            </div>

            <div className="relative w-full">
                {children}
            </div>
        </div>
    );
}