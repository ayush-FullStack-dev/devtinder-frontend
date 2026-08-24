"use client";

import {
    googleSans,
    googleSansFlex,
} from "@/assets/fonts/font.google";
import { Heart, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

type ConnectionOverlayClientProps = {
    show: boolean;
    className?: string;
    onClose?: () => void;
};

const ConnectionOverlayClient = ({
    show,
    className,
    onClose,
}: ConnectionOverlayClientProps) => {
    const router = useRouter();
    const { resolvedTheme } = useTheme();
    const [open, setOpen] = useState(show);

    const isDark = resolvedTheme === "dark";

    const closeOverlay = () => {
        setOpen(false);
        onClose?.();
    };

    useEffect(() => {
        setOpen(show);
    }, [show]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeOverlay();
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [open]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const previousOverflow =
            document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow =
                previousOverflow;
        };
    }, [open]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                    transition={{
                        duration: 0.2,
                        ease: "easeOut",
                    }}
                    onClick={closeOverlay}
                    className={`
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                        ${isDark
                            ? "bg-black/10 backdrop-blur-[1px]"
                            : "bg-black/5 backdrop-blur-[1px]"
                        }
                        ${className ?? ""}
                    `}
                >
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.94,
                            y: 14,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.96,
                            y: 8,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 360,
                            damping: 28,
                            mass: 0.7,
                        }}
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                        className={`
                            relative
                            box-border
                            flex
                            h-96
                            w-110
                            max-w-[calc(100vw-32px)]
                            flex-col
                            items-center
                            justify-around
                            rounded-xl
                            px-7
                            ${isDark
                                ? "bg-[#22201f] text-white"
                                : "border border-[#E5E5E5] bg-white text-[#24262A]"
                            }
                        `}
                    >
                        <motion.button
                            type="button"
                            aria-label="Close connection overlay"
                            onClick={closeOverlay}
                            whileHover={{
                                scale: 1.08,
                            }}
                            whileTap={{
                                scale: 0.92,
                            }}
                            className={`
                                absolute
                                right-3
                                top-3
                                flex
                                size-9
                                items-center
                                justify-center
                                rounded-full
                                transition-colors
                                duration-200
                                ${isDark
                                    ? "text-[#504d4d] hover:bg-white/5 hover:text-white"
                                    : "text-[#999] hover:bg-black/5 hover:text-[#24262A]"
                                }
                            `}
                        >
                            <X
                                size={25}
                                strokeWidth={1.4}
                            />
                        </motion.button>

                        <div className="flex flex-col items-center gap-5">
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.7,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                transition={{
                                    delay: 0.08,
                                    type: "spring",
                                    stiffness: 420,
                                    damping: 22,
                                }}
                                className="
                                    flex
                                    size-16
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-[#EC180E]
                                    text-white
                                    shadow-lg
                                "
                            >
                                <Heart
                                    size={30}
                                    strokeWidth={3}
                                    color="#FFFFFF"
                                    fill="#FFFFFF"
                                />
                            </motion.div>

                            <div
                                className={`
                                    ${googleSans.className}
                                    ml-4
                                    flex
                                    flex-col
                                    gap-4
                                    self-center
                                `}
                            >
                                <h1 className="text-2xl font-bold">
                                    Ready to make a connection?
                                </h1>

                                <div
                                    className={`
                                        ${googleSansFlex.className}
                                        flex
                                        flex-col
                                        gap-1
                                        text-sm
                                        leading-5
                                        ${isDark
                                            ? "text-muted-foreground"
                                            : "text-[#6B6B6B]"
                                        }
                                    `}
                                >
                                    <p>
                                        You've shown interest in this
                                        developer.
                                    </p>

                                    <p>
                                        Create an account to start
                                        connecting, collaborate, and
                                        build together.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            type="button"
                            onClick={() => router.push("/signup")}
                            whileHover={{
                                scale: 1.015,
                            }}
                            whileTap={{
                                scale: 0.985,
                            }}
                            transition={{
                                duration: 0.15,
                            }}
                            className={`
                                ${googleSansFlex.className}
                                h-13
                                w-full
                                rounded-4xl
                                text-xl
                                font-extrabold
                                ${isDark
                                    ? "bg-white text-[#24262A]"
                                    : "bg-[#24262A] text-white"
                                }
                            `}
                        >
                            Get Started
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConnectionOverlayClient;