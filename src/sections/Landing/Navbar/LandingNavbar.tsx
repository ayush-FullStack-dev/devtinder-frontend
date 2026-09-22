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

type NavbarTheme = "light" | "dark";

interface LandingNavbarProps {
    theme?: NavbarTheme;
}

const LandingNavbar = ({
    theme,
}: LandingNavbarProps) => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [hidden, setHidden] = useState(false);
    const [mounted, setMounted] = useState(false);

    const reducedMotion = useReducedMotion();

    const lastScrollTop = useRef(0);
    const scrollFrame = useRef<number | null>(null);
    const scrollAnimationFrame = useRef<number | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const updateNavbar = useCallback(() => {
        if (scrollFrame.current !== null) return;

        scrollFrame.current = requestAnimationFrame(() => {
            scrollFrame.current = null;

            const scrollContainer =
                document.getElementById("main-scroll");

            const currentScrollTop =
                scrollContainer?.scrollTop ?? 0;

            const scrollDelta =
                currentScrollTop - lastScrollTop.current;

            if (activeMenu !== null || currentScrollTop <= 4) {
                setHidden(false);
            } else if (scrollDelta > 3) {
                setHidden(true);
            } else if (scrollDelta < -3) {
                setHidden(false);
            }

            lastScrollTop.current = currentScrollTop;
        });
    }, [activeMenu]);

    useEffect(() => {
        const scrollContainer =
            document.getElementById("main-scroll");

        updateNavbar();

        scrollContainer?.addEventListener(
            "scroll",
            updateNavbar,
            { passive: true }
        );

        return () => {
            scrollContainer?.removeEventListener(
                "scroll",
                updateNavbar
            );

            if (scrollFrame.current !== null) {
                cancelAnimationFrame(scrollFrame.current);
                scrollFrame.current = null;
            }
        };
    }, [updateNavbar]);

    useEffect(() => {
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
            const scrollContainer =
                document.getElementById("main-scroll");

            const section =
                document.getElementById(sectionId);

            if (!scrollContainer || !section) return;

            if (scrollAnimationFrame.current !== null) {
                cancelAnimationFrame(
                    scrollAnimationFrame.current
                );

                scrollAnimationFrame.current = null;
            }

            const startScrollTop =
                scrollContainer.scrollTop;

            const containerRect =
                scrollContainer.getBoundingClientRect();

            const sectionRect =
                section.getBoundingClientRect();

            const targetScrollTop =
                startScrollTop +
                sectionRect.top -
                containerRect.top;

            const distance =
                targetScrollTop - startScrollTop;

            if (Math.abs(distance) < 2) return;

            const duration = Math.min(
                Math.max(Math.abs(distance) * 0.35, 450),
                850
            );

            const startTime = performance.now();

            const easeOutCubic = (value: number) =>
                1 - Math.pow(1 - value, 3);

            const animateScroll = (
                currentTime: number
            ) => {
                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                scrollContainer.scrollTop =
                    startScrollTop +
                    distance *
                    easeOutCubic(progress);

                if (progress < 1) {
                    scrollAnimationFrame.current =
                        requestAnimationFrame(
                            animateScroll
                        );
                } else {
                    scrollAnimationFrame.current = null;
                }
            };

            scrollAnimationFrame.current =
                requestAnimationFrame(animateScroll);

            window.history.replaceState(
                null,
                "",
                `/#${sectionId}`
            );
        },
        []
    );

    const menuOpen = activeMenu !== null;

    return (
        <motion.header
            data-navbar-theme={theme}
            initial={{
                y: reducedMotion ? 0 : -12,
                opacity: reducedMotion ? 1 : 0,
            }}
            animate={{
                y:
                    hidden && !menuOpen
                        ? "-105%"
                        : "0%",
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
            onMouseEnter={() => setHidden(false)}
            className="
                fixed
                left-0
                right-0
                top-0
                z-100
                w-full
                border-b
                border-white/5
                bg-bg-secondary/95
                px-5
                shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                backdrop-blur-xl
                backdrop-saturate-150
            "
        >
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
                                    border-nav-link
                                    bg-transparent
                                    text-nav-link
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

export default LandingNavbar;