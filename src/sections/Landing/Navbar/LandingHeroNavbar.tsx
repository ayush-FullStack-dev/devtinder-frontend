"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

import LogoHorizontal from "@/components/brand/LogoHorizontal";
import AnimatedButton from "@/components/shared/animation/AnimatedButton";
import HoverFillButton from "@/components/shared/HoverFillButton";
import SharedNavbarMenu from "@/components/shared/SharedNavbarMenu";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ease = [0.22, 1, 0.36, 1] as const;

const LandingHeroNavbar = () => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    const reducedMotion = useReducedMotion();

    const scrollAnimationFrame = useRef<number | null>(null);

    const menuOpen = activeMenu !== null;

    useEffect(() => {
        setMounted(true);

        return () => {
            if (scrollAnimationFrame.current !== null) {
                cancelAnimationFrame(
                    scrollAnimationFrame.current
                );
            }
        };
    }, []);

    const scrollToSection = useCallback(
        (sectionId: string) => {
            const container =
                document.getElementById("main-scroll");

            const section =
                document.getElementById(sectionId);

            if (!container || !section) return;

            if (scrollAnimationFrame.current !== null) {
                cancelAnimationFrame(
                    scrollAnimationFrame.current
                );

                scrollAnimationFrame.current = null;
            }

            const start = container.scrollTop;

            const target =
                start +
                section.getBoundingClientRect().top -
                container.getBoundingClientRect().top;

            const distance = target - start;

            if (Math.abs(distance) < 2) return;

            const duration = Math.min(
                Math.max(Math.abs(distance) * 0.35, 450),
                850
            );

            const startTime = performance.now();

            const animate = (time: number) => {
                const progress = Math.min(
                    (time - startTime) / duration,
                    1
                );

                const eased =
                    1 - Math.pow(1 - progress, 3);

                container.scrollTop =
                    start + distance * eased;

                if (progress < 1) {
                    scrollAnimationFrame.current =
                        requestAnimationFrame(animate);
                } else {
                    scrollAnimationFrame.current = null;
                }
            };

            scrollAnimationFrame.current =
                requestAnimationFrame(animate);

            window.history.replaceState(
                null,
                "",
                `/#${sectionId}`
            );
        },
        []
    );

    return (
        <motion.header
            initial={{
                y: reducedMotion ? 0 : -12,
                opacity: reducedMotion ? 1 : 0,
            }}
            animate={{
                y: 0,
                opacity: 1,
            }}
            transition={
                mounted
                    ? {
                        y: {
                            type: "spring",
                            stiffness: 140,
                            damping: 26,
                            mass: 0.9,
                        },
                        opacity: {
                            duration: 0.4,
                            ease,
                        },
                    }
                    : {
                        y: {
                            duration: 0.55,
                            ease,
                        },
                        opacity: {
                            duration: 0.45,
                            ease: "easeOut",
                        },
                    }
            }
            className="
                absolute
                top-0
                z-100
                w-full
                px-5
                text-white
            "
        >
            <motion.div
                initial={false}
                animate={{
                    height: menuOpen ? 222 : 0,
                    opacity: menuOpen ? 1 : 0,
                }}
                transition={{
                    height: {
                        duration: 0.4,
                        ease,
                    },
                    opacity: {
                        duration: 0.2,
                        ease: "easeOut",
                    },
                }}
                className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    top-0
                    -z-10
                    overflow-hidden
                    bg-black/30
                    backdrop-blur-xl
                    backdrop-saturate-150
                "
            />

            <div
                className="relative w-full"
                onMouseLeave={() => setActiveMenu(null)}
            >
                <div
                    className="
                        relative
                        flex
                        w-full
                        items-center
                        justify-between
                        py-5
                    "
                >
                    <motion.div
                        className="shrink-0"
                        initial={{
                            opacity: reducedMotion ? 1 : 0,
                            x: reducedMotion ? 0 : -8,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            delay: 0.1,
                            duration: 0.5,
                            ease,
                        }}
                    >
                        <LogoHorizontal />
                    </motion.div>

                    <SharedNavbarMenu
                        activeMenu={activeMenu}
                        onMenuChange={setActiveMenu}
                        onScrollToSection={scrollToSection}
                        theme="dark"
                    />

                    <motion.div
                        className="
                            hidden
                            min-w-65
                            shrink-0
                            items-center
                            justify-end
                            gap-5
                            lg:flex
                        "
                        initial={{
                            opacity: reducedMotion ? 1 : 0,
                            x: reducedMotion ? 0 : 8,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            delay: 0.22,
                            duration: 0.5,
                            ease,
                        }}
                    >
                        <Link
                            href="/auth/signup"

                            rel="noopener noreferrer"
                        >
                            <AnimatedButton
                                className="
                                    hidden
                                    h-11.5
                                    w-37
                                    rounded-3xl
                                    bg-green-brand
                                    text-white
                                    xl:inline-flex
                                "
                                text="Get Started"
                            />
                        </Link>

                        <Link
                            href="/auth/login"
                            rel="noopener noreferrer"
                        >
                            <HoverFillButton
                                className="
                                    h-12
                                    w-35
                                    rounded-full
                                    border
                                    border-white
                                    bg-transparent
                                    text-white
                                    xl:h-11
                                    xl:w-30
                                    hover:border-transparent
                                "
                                text="Log In"
                            />
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    initial={false}
                    animate={{
                        height: menuOpen ? 150 : 0,
                    }}
                    transition={{
                        duration: 0.4,
                        ease,
                    }}
                    className="
                        pointer-events-none
                        relative
                        hidden
                        w-full
                        lg:block
                    "
                />
            </div>
        </motion.header>
    );
};

export default LandingHeroNavbar;