"use client";

import { googleSansFlex } from "@/assets/fonts/font.google";
import LogoHorizontal from "@/components/brand/LogoHorizontal";
import AnimatedButton from "@/components/shared/AnimatedButton";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { motion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const LandingNavbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [hidden, setHidden] = useState(false);

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

            setScrolled(
                currentScrollTop > 4 || hasHash
            );

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

        window.addEventListener(
            "hashchange",
            updateNavbarState
        );

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
                cancelAnimationFrame(
                    animationFrame.current
                );

                animationFrame.current = null;
            }
        };
    }, [updateNavbarState]);

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

            const start =
                scrollContainer.scrollTop;

            const containerRect =
                scrollContainer.getBoundingClientRect();

            const sectionRect =
                section.getBoundingClientRect();

            const target =
                start +
                sectionRect.top -
                containerRect.top;

            const distance = target - start;

            if (Math.abs(distance) < 2) {
                return;
            }

            const duration = Math.min(
                Math.max(
                    Math.abs(distance) * 0.35,
                    450
                ),
                850
            );

            const startTime = performance.now();

            const easeOutCubic = (t: number) => {
                return 1 - Math.pow(1 - t, 3);
            };

            const animateScroll = (
                currentTime: number
            ) => {
                const elapsed =
                    currentTime - startTime;

                const progress = Math.min(
                    elapsed / duration,
                    1
                );

                const easedProgress =
                    easeOutCubic(progress);

                scrollContainer.scrollTop =
                    start +
                    distance * easedProgress;

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
                requestAnimationFrame(
                    animateScroll
                );

            window.history.replaceState(
                null,
                "",
                `/#${sectionId}`
            );
        },
        []
    );

    const navbarActive =
        scrolled || activeMenu !== null;

    return (
        <motion.header
            initial={false}
            animate={{
                y:
                    hidden && activeMenu === null
                        ? "-105%"
                        : "0%",
            }}
            transition={{
                y: {
                    type: "spring",
                    stiffness: 140,
                    damping: 26,
                    mass: 0.9,
                },
            }}
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

                ${navbarActive
                    ? `
                            border-b
                            border-white/5
                            bg-[var(--bg-secondary)]/95
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
                onMouseLeave={() =>
                    setActiveMenu(null)
                }
            >
                <div
                    className="
                        grid
                        w-full
                        grid-cols-[minmax(0,1fr)_auto_minmax(260px,1fr)]
                        items-center
                        py-5
                    "
                >
                    <div className="shrink-0 justify-self-start">
                        <LogoHorizontal />
                    </div>

                    <nav
                        className={`
                            hidden
                            w-[35vw]
                            min-w-[540px]
                            grid-cols-4
                            text-md
                            lg:grid
                            2xl:w-[40vw]
                            ${googleSansFlex.className}
                        `}
                        aria-label="Main navigation"
                    >
                        {navItems.map((item) => {
                            const isActive =
                                activeMenu === item.name;

                            return (
                                <motion.div
                                    key={item.name}
                                    className="
                                        flex
                                        min-w-max
                                        justify-center
                                    "
                                    onMouseEnter={() =>
                                        setActiveMenu(
                                            item.submenu.length > 0
                                                ? item.name
                                                : null
                                        )
                                    }
                                    whileHover={{
                                        y: -1,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeOut",
                                    }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={(event) => {
                                            if (
                                                item.scrollToSection
                                            ) {
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
                                            ${isActive
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

                    <div
                        className="
                            hidden
                            min-w-[260px]
                            shrink-0
                            items-center
                            justify-self-end
                            gap-5
                            lg:flex
                        "
                    >
                        <Link href="/signup">
                            <AnimatedButton
                                className="
                                    h-11.5
                                    w-37
                                    rounded-3xl
                                    bg-green-brand
                                "
                                text="Get Started"
                            />
                        </Link>

                        <Link href="/login">
                            <PrimaryButton
                                showIcon={false}
                                className="
                                    h-10
                                    w-25
                                    rounded-2xl
                                    border
                                    border-green-primary
                                    bg-transparent
                                    text-showcase
                                    hover:bg-green-brand
                                "
                                text="Log In"
                            />
                        </Link>
                    </div>
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
                        hidden
                        w-full
                        grid-cols-[minmax(0,1fr)_auto_minmax(260px,1fr)]
                        overflow-hidden
                        lg:grid
                    "
                >
                    <div />

                    <div
                        className={`
                            grid
                            w-[35vw]
                            min-w-[540px]
                            grid-cols-4
                            text-md
                            2xl:w-[40vw]
                            ${googleSansFlex.className}
                        `}
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
                                        (
                                            subItem,
                                            index
                                        ) => {
                                            const isVisible =
                                                activeMenu ===
                                                item.name;

                                            return (
                                                <motion.div
                                                    key={
                                                        subItem.name
                                                    }
                                                    initial={false}
                                                    animate={{
                                                        opacity:
                                                            isVisible
                                                                ? 1
                                                                : 0,
                                                        y:
                                                            isVisible
                                                                ? 0
                                                                : 10,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                        delay:
                                                            isVisible
                                                                ? index *
                                                                0.06
                                                                : 0,
                                                        ease: [
                                                            0.22,
                                                            1,
                                                            0.36,
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
                                                        href={
                                                            subItem.href
                                                        }
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
                                                        {
                                                            subItem.name
                                                        }
                                                    </Link>
                                                </motion.div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="min-w-[260px]" />
                </motion.div>
            </div>
        </motion.header>
    );
};

export default LandingNavbar;