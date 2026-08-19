"use client";

import { googleSansFlex } from "@/assets/fonts/font.google";
import LogoHorizontal from "@/components/brand/LogoHorizontal";
import PrimaryButton from "@/components/shared/PrimaryButton";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

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

    return (
        <header
            className={`
        fixed top-0 left-0 right-0 z-40
        grid grid-cols-[1fr_auto_1fr]
        items-center
        w-full
        px-5 py-5

        transition-all duration-300 ease-out

        ${scrolled
                    ? `
              bg-[var(--bg-secondary)]/45
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
            {/* Logo */}
            <div className="justify-self-start">
                <LogoHorizontal />
            </div>

            {/* Navigation */}
            <nav
                className={`
          hidden lg:flex
          w-[35vw]
          2xl:w-[40vw]
          justify-between
          text-md
          ${googleSansFlex.className}
        `}
                aria-label="Main navigation"
            >
                <Link
                    href="/discover"
                    className="cursor-pointer transition-opacity hover:opacity-70"
                >
                    Discover
                </Link>

                <Link
                    href="/subscriptions"
                    className="cursor-pointer transition-opacity hover:opacity-70"
                >
                    Subscriptions
                </Link>

                <Link
                    href="/about"
                    className="cursor-pointer transition-opacity hover:opacity-70"
                >
                    About
                </Link>

                <Link
                    href="/blog"
                    className="cursor-pointer transition-opacity hover:opacity-70"
                >
                    Blog
                </Link>
            </nav>

            {/* Actions */}
            <div className="hidden lg:flex items-center justify-self-end gap-5">
                <Link href="/signup">
                    <PrimaryButton
                        showIcon={false}
                        className="h-11.5 w-37 rounded-3xl bg-green-brand"
                        text="Get Started"
                    />
                </Link>

                <Link href="/login">
                    <PrimaryButton
                        showIcon={false}
                        className="
              h-10 w-25
              rounded-2xl
              border border-green-primary
              bg-transparent
              text-showcase
              hover:bg-green-brand
            "
                        text="Log In"
                    />
                </Link>
            </div>
        </header>
    );
};

export default Navbar;