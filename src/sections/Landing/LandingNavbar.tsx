"use client";

import { googleSansFlex } from "@/assets/fonts/font.google";
import LogoHorizontal from "@/components/brand/LogoHorizontal";
import AnimatedButton from "@/components/shared/AnimatedButton";
import HoverFillButton from "@/components/shared/HoverFillButton";
import { motion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LandingNavbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [hidden, setHidden] = useState(false);
    const [mounted, setMounted] = useState(false);

    const reduced = useReducedMotion();

    const lastScrollTop = useRef(0);
    const animationFrame = useRef<number | null>(null);
    const scrollAnimationFrame = useRef<number | null>(null);

    const navItems = [
        {
            name: "Discover",
            href: "/#discover",
            submenu: [],
            scrollToSection: "discover",
        },
        {
            name: "Features",
            href: "/feature",
            submenu: [],
        },
        {
            name: "Subscriptions",
            href: "/subscriptions",
            submenu: [
                {
                    name: "DevTinder free",
                    href: "/subscriptions/free",
                },
                {
                    name: "DevTinder silver",
                    href: "/subscriptions/silver",
                },
                {
                    name: "DevTinder gold",
                    href: "/subscriptions/gold",
                },
            ],
        },
        {
            name: "About",
            href: "/about",
            submenu: [],
        },
    ];

    useEffect(() => {
        setMounted(true);
    }, []);

    const updateNavbarState = useCallback(() => {
        if (animationFrame.current !== null) return;

        animationFrame.current = requestAnimationFrame(() => {
            animationFrame.current = null;

            const scrollContainer =
                document.getElementById("main-scroll");

            const currentScrollTop =
                scrollContainer?.scrollTop ?? 0;

            const delta =
                currentScrollTop - lastScrollTop.current;

            const hasHash =
                window.location.hash.length > 0;

            setScrolled(currentScrollTop > 4 || hasHash);

            if (activeMenu !== null) {
                setHidden(false);
            } else if (currentScrollTop <= 4) {
                setHidden(false);
            } else if (delta > 3) {
                setHidden(true);
            } else if (delta < -3) {
                setHidden(false);
            }

            lastScrollTop.current = currentScrollTop;
        });
    }, [activeMenu]);

    useEffect(() => {
        const scrollContainer =
            document.getElementById("main-scroll");

        updateNavbarState();

        scrollContainer?.addEventListener(
            "scroll",
            updateNavbarState,
            { passive: true }
        );

        window.addEventListener("hashchange", updateNavbarState);

        return () => {
            scrollContainer?.removeEventListener(
                "scroll",
                updateNavbarState
            );

            window.removeEventListener(
                "hashchange",
                updateNavbarState
            );

            if (animationFrame.current !== null) {
                cancelAnimationFrame(animationFrame.current);
                animationFrame.current = null;
            }
        };
    }, [updateNavbarState]);

    const scrollToSection = useCallback((sectionId: string) => {
        const scrollContainer =
            document.getElementById("main-scroll");

        const section = document.getElementById(sectionId);

        if (!scrollContainer || !section) return;

        if (scrollAnimationFrame.current !== null) {
            cancelAnimationFrame(scrollAnimationFrame.current);
            scrollAnimationFrame.current = null;
        }

        const start = scrollContainer.scrollTop;

        const containerRect =
            scrollContainer.getBoundingClientRect();

        const sectionRect = section.getBoundingClientRect();

        const target =
            start + sectionRect.top - containerRect.top;

        const distance = target - start;

        if (Math.abs(distance) < 2) return;

        const duration = Math.min(
            Math.max(Math.abs(distance) * 0.35, 450),
            850
        );

        const startTime = performance.now();

        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

        const animateScroll = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);

            scrollContainer.scrollTop =
                start + distance * easedProgress;

            if (progress < 1) {
                scrollAnimationFrame.current =
                    requestAnimationFrame(animateScroll);
            } else {
                scrollAnimationFrame.current = null;
            }
        };

        scrollAnimationFrame.current =
            requestAnimationFrame(animateScroll);

        window.history.replaceState(null, "", `/#${sectionId}`);
    }, []);

    const navbarActive = scrolled || activeMenu !== null;

    const entranceY = reduced ? 0 : -12;
    const entranceOpacity = reduced ? 1 : 0;

    return (
        <motion.header
            initial={{ y: entranceY, opacity: entranceOpacity }}
            animate={{
                y:
                    hidden && activeMenu === null
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
                              ease: [0.22, 1, 0.36, 1],
                          },
                      }
                    : {
                          y: {
                              duration: 0.55,
                              ease: [0.22, 1, 0.36, 1],
                          },
                          opacity: {
                              duration: 0.45,
                              ease: "easeOut",
                          },
                      }
            }
            onMouseEnter={() => setHidden(false)}
            className={`
                fixed
                top-0
                left-0
                right-0
                z-40
                w-full
                px-5
                transition-[background-color,border-color,box-shadow,backdrop-filter]
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]

                ${
                    navbarActive
                        ? `
                            border-b
                            border-white/5
                            bg-bg-secondary/95
                            shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                            backdrop-blur-xl
                            backdrop-saturate-150
                        `
                        : `
                            border-b
                            border-transparent
                            bg-transparent
                            shadow-none
                        `
                }
            `}
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
                        initial={{ opacity: reduced ? 1 : 0, x: reduced ? 0 : -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: 0.1,
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        <LogoHorizontal />
                    </motion.div>
                    <nav
                        className={`
                            absolute
                            left-1/2
                            top-1/2
                            hidden
                            w-[35vw]
                            min-w-140
                            -translate-x-1/2
                            -translate-y-1/2
                            grid-cols-4
                            text-md
                            lg:grid
                            2xl:w-[40vw]
                            ${googleSansFlex.className}
                        `}
                        aria-label="Main navigation"
                    >
                        {navItems.map((item, i) => {
                            const isActive = activeMenu === item.name;

                            return (
                                <motion.div
                                    key={item.name}
                                    className="
                                        flex
                                        min-w-max
                                        justify-center
                                    "
                                    initial={{
                                        opacity: reduced ? 1 : 0,
                                        y: reduced ? 0 : -6,
                                    }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: 0.18 + i * 0.06,
                                        duration: 0.4,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    onMouseEnter={() =>
                                        setActiveMenu(
                                            item.submenu.length > 0
                                                ? item.name
                                                : null
                                        )
                                    }
                                    whileHover={{ y: -1 }}
                                >
                                    <Link
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(event) => {
                                            if (item.scrollToSection) {
                                                event.preventDefault();
                                                scrollToSection(
                                                    item.scrollToSection
                                                );
                                            }
                                        }}
                                        className={`
                                            cursor-pointer
                                            whitespace-nowrap
                                            transition-all
                                            duration-200
                                            ease-out
                                            ${
                                                isActive
                                                    ? "font-bold"
                                                    : "font-medium hover:font-bold"
                                            }
                                        `}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </nav>

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
                            opacity: reduced ? 1 : 0,
                            x: reduced ? 0 : 8,
                        }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: 0.22,
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        <Link
                            href="/auth/signup"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <AnimatedButton
                                className="
                                    hidden
                                    h-11.5
                                    w-37
                                    rounded-3xl
                                    bg-green-brand
                                    xl:inline-flex
                                "
                                text="Get Started"
                            />
                        </Link>

                        <Link
                            href="/auth/login"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <HoverFillButton
                                className="
                                    h-12
                                    w-35
                                    rounded-full
                                    border
                                    border-green-primary
                                    bg-transparent
                                    text-showcase
                                    xl:h-11
                                    xl:w-30
                                "
                                text="Log In"
                            />
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    initial={false}
                    animate={{
                        height: activeMenu ? 150 : 0,
                        opacity: activeMenu ? 1 : 0,
                    }}
                    transition={{
                        height: {
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                        },
                        opacity: {
                            duration: 0.2,
                            ease: "easeOut",
                        },
                    }}
                    className="
                        relative
                        hidden
                        w-full
                        overflow-hidden
                        lg:block
                    "
                >
                    <div
                        className="
                            absolute
                            left-1/2
                            top-0
                            w-[35vw]
                            min-w-135
                            -translate-x-1/2
                            grid-cols-4
                            text-md
                            lg:grid
                            2xl:w-[40vw]
                        "
                    >
                        {navItems.map((item) => (
                            <div
                                key={item.name}
                                className="
                                    flex
                                    min-w-max
                                    justify-center
                                "
                            >
                                <div
                                    className="
                                        flex
                                        flex-col
                                        items-start
                                        gap-3
                                        pt-1
                                    "
                                >
                                    {item.submenu.map(
                                        (subItem, index) => {
                                            const isVisible =
                                                activeMenu === item.name;

                                            return (
                                                <motion.div
                                                    key={subItem.name}
                                                    initial={false}
                                                    animate={{
                                                        opacity: isVisible
                                                            ? 1
                                                            : 0,
                                                        y: isVisible
                                                            ? 0
                                                            : 10,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                        delay: isVisible
                                                            ? index * 0.06
                                                            : 0,
                                                        ease: [
                                                            0.22, 1, 0.36,
                                                            1,
                                                        ],
                                                    }}
                                                    className={
                                                        !isVisible
                                                            ? "pointer-events-none"
                                                            : ""
                                                    }
                                                >
                                                    <Link
                                                        href={subItem.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="
                                                            relative
                                                            block
                                                            w-fit
                                                            cursor-pointer
                                                            whitespace-nowrap
                                                            after:absolute
                                                            after:-bottom-1
                                                            after:left-0
                                                            after:h-px
                                                            after:w-0
                                                            after:bg-current
                                                            after:transition-[width]
                                                            after:duration-300
                                                            after:ease-out
                                                            hover:after:w-full
                                                        "
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                </motion.div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.header>
    );
};

export default LandingNavbar;
