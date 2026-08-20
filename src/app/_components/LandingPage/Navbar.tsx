"use client";

import { googleSansFlex } from "@/assets/fonts/font.google";
import LogoHorizontal from "@/components/brand/LogoHorizontal";
import AnimatedButton from "@/components/shared/AnimatedButton";
import PrimaryButton from "@/components/shared/PrimaryButton";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    const navItems = [
        {
            name: "Discover",
            href: "/discover",
            submenu: [],
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
        const scrollContainer = document.getElementById("main-scroll");

        if (!scrollContainer) return;

        const handleScroll = () => {
            setScrolled(scrollContainer.scrollTop > 5);
        };

        handleScroll();

        scrollContainer.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            scrollContainer.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navbarActive = scrolled || activeMenu !== null;

    return (
   <header
    className={`
        fixed top-0 left-0 right-0 z-40
        w-full px-5

        transition-[background-color,border-color,box-shadow,backdrop-filter]
        duration-500
        ease-out

        ${
            navbarActive
                ? `
                    bg-[var(--bg-secondary)]/95
                    backdrop-blur-xl
                    backdrop-saturate-150
                    border-b border-white/5
                    shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                `
                : `
                    bg-transparent
                    border-b border-transparent
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
                grid
                grid-cols-[minmax(0,1fr)_auto_minmax(260px,1fr)]
                items-center
                w-full
                py-5
            "
        >
            <div className="justify-self-start shrink-0">
                <LogoHorizontal />
            </div>

            <nav
                className={`
                    hidden
                    lg:grid
                    grid-cols-4
                    w-[35vw]
                    min-w-[540px]
                    2xl:w-[40vw]
                    text-md
                    ${googleSansFlex.className}
                `}
                aria-label="Main navigation"
            >
                {navItems.map((item) => (
                    <div
                        key={item.name}
                        className="flex justify-center min-w-max"
                        onMouseEnter={() => {
                            setActiveMenu(
                                item.submenu.length > 0
                                    ? item.name
                                    : null
                            );
                        }}
                    >
                        <Link
                            href={item.href}
                            className="
                                whitespace-nowrap
                                cursor-pointer
                                font-medium
                                transition-[font-weight]
                                duration-200
                                hover:font-bold
                            "
                        >
                            {item.name}
                        </Link>
                    </div>
                ))}
            </nav>

            <div
                className="
                    hidden
                    lg:flex
                    shrink-0
                    min-w-[260px]
                    items-center
                    justify-self-end
                    gap-5
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

        <div
            className={`
                hidden
                lg:grid
                grid-cols-[minmax(0,1fr)_auto_minmax(260px,1fr)]
                w-full
                overflow-hidden

                transition-[max-height,opacity,padding]
                duration-500
                ease-out

                ${
                    activeMenu
                        ? `
                            max-h-[420px]
                            opacity-100
                            pb-8
                        `
                        : `
                            max-h-0
                            opacity-0
                            pb-0
                            pointer-events-none
                        `
                }
            `}
        >
            <div />

            <div
                className={`
                    grid
                    grid-cols-4
                    w-[35vw]
                    min-w-[540px]
                    2xl:w-[40vw]
                    text-md
                    ${googleSansFlex.className}
                `}
            >
                {navItems.map((item) => (
                    <div
                        key={item.name}
                        className="flex justify-center min-w-max"
                    >
                        <div className="flex flex-col items-start gap-3">
                            {item.submenu.map((subItem, index) => {
                                const isVisible =
                                    activeMenu === item.name;

                                return (
                                    <Link
                                        key={subItem.name}
                                        href={subItem.href}
                                        className={`
                                            relative
                                            w-fit
                                            whitespace-nowrap
                                            cursor-pointer

                                            transition-all
                                            duration-500
                                            ease-out

                                            after:absolute
                                            after:left-0
                                            after:-bottom-1
                                            after:h-px
                                            after:w-0
                                            after:bg-current
                                            after:transition-[width]
                                            after:duration-300
                                            hover:after:w-full

                                            ${
                                                isVisible
                                                    ? `
                                                        translate-y-0
                                                        opacity-100
                                                    `
                                                    : `
                                                        translate-y-3
                                                        opacity-0
                                                        pointer-events-none
                                                    `
                                            }
                                        `}
                                        style={{
                                            transitionDelay: isVisible
                                                ? `${index * 70}ms`
                                                : "0ms",
                                        }}
                                    >
                                        {subItem.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="min-w-[260px]" />
        </div>
    </div>
</header>
    );
};

export default Navbar;