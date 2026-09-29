"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { googleSansFlex } from "@/assets/fonts/font.google";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type NavigationSubItem = {
    name: string;
    href: string;
};

export type NavigationItem = {
    name: string;
    href: string;
    submenu: NavigationSubItem[];
    scrollToSection?: string;
};

export const navigationItems: NavigationItem[] = [
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

const ease = [0.22, 1, 0.36, 1] as const;

export type NavbarTheme = "light" | "dark";

type SharedNavbarMenuProps = {
    activeMenu: string | null;
    onMenuChange: (menu: string | null) => void;
    onScrollToSection: (sectionId: string) => void;
    theme?: NavbarTheme;
};

const SharedNavbarMenu = ({
    activeMenu,
    onMenuChange,
    onScrollToSection,
    theme,
}: SharedNavbarMenuProps) => {
    const reducedMotion = useReducedMotion();
    const textColor =
        theme === "light"
            ? "text-nav-link"
            : theme === "dark"
                ? "text-white"
                : "text-nav-link dark:text-white";

    return (
        <div
            className="
                absolute
                left-1/2
                top-0
                z-20
                hidden
                w-[35vw]
                min-w-140
                -translate-x-1/2
                lg:block
                2xl:w-[40vw]
            "
            onMouseLeave={() => onMenuChange(null)}
        >
            <nav
                aria-label="Main navigation"
                className={`
                    grid
                    w-full
                    grid-cols-4
                    py-5
                    text-md
                    ${googleSansFlex.className}
                    ${textColor}
                `}
            >
                {navigationItems.map((item, index) => {
                    const hasSubmenu = item.submenu.length > 0;
                    const isActive = activeMenu === item.name;

                    return (
                        <motion.div
                            key={item.name}
                            className="
                                flex
                                min-w-0
                                justify-center
                            "
                            initial={{
                                opacity: reducedMotion ? 1 : 0,
                                y: reducedMotion ? 0 : -6,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: 0.18 + index * 0.06,
                                duration: 0.4,
                                ease,
                            }}
                            whileHover={{ y: -1 }}
                            onMouseEnter={() =>
                                onMenuChange(
                                    hasSubmenu
                                        ? item.name
                                        : null
                                )
                            }
                        >
                            <Link
                                href={item.href}
                                rel="noopener noreferrer"
                                onClick={(event) => {
                                    if (!item.scrollToSection) {
                                        return;
                                    }

                                    event.preventDefault();

                                    onScrollToSection(
                                        item.scrollToSection
                                    );
                                }}
                                className="
                                    group
                                    relative
                                    cursor-pointer
                                    whitespace-nowrap
                                    pb-1
                                    font-medium
                                    transition-[font-weight]
                                    duration-200
                                    group-hover:font-bold
                                    ease-out
                                "
                            >
                                <span
                                    className={
                                        isActive
                                            ? "font-bold"
                                            : "font-heading group-hover:font-bold"
                                    }
                                >
                                    {item.name}
                                </span>
                            </Link>
                        </motion.div>
                    );
                })}
            </nav>

            <motion.div
                initial={false}
                animate={{
                    height: activeMenu ? 150 : 0,
                    opacity: activeMenu ? 1 : 0,
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
                    absolute
                    left-0
                    top-full
                    z-30
                    w-full
                    overflow-hidden
                "
            >
                <div
                    className={`
                        grid
                        w-full
                        grid-cols-4
                        text-md
                        ${googleSansFlex.className}
                        ${textColor}
                    `}
                >
                    {navigationItems.map((item) => (
                        <div
                            key={item.name}
                            className="
                                flex
                                min-w-0
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
                                        const visible =
                                            activeMenu === item.name;

                                        return (
                                            <motion.div
                                                key={subItem.name}
                                                initial={false}
                                                animate={{
                                                    opacity: visible
                                                        ? 1
                                                        : 0,
                                                    y: visible
                                                        ? 0
                                                        : 10,
                                                }}
                                                transition={{
                                                    duration: 0.3,
                                                    delay: visible
                                                        ? index * 0.06
                                                        : 0,
                                                    ease,
                                                }}
                                                className={
                                                    visible
                                                        ? "pointer-events-auto"
                                                        : "pointer-events-none"
                                                }
                                            >
                                                <Link
                                                    href={
                                                        subItem.href
                                                    }
                                                    rel="noopener noreferrer"
                                                    className="
                                                        group
                                                        relative
                                                        block
                                                        w-fit
                                                        cursor-pointer
                                                        whitespace-nowrap
                                                        pb-1
                                                    "
                                                >
                                                    <span>
                                                        {
                                                            subItem.name
                                                        }
                                                    </span>

                                                    <span
                                                        aria-hidden="true"
                                                        className="
                                                            absolute
                                                            bottom-0
                                                            left-0
                                                            h-px
                                                            w-0
                                                            bg-current
                                                            transition-[width]
                                                            duration-300
                                                            ease-out
                                                            group-hover:w-full
                                                        "
                                                    />
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
    );
};

export default SharedNavbarMenu;