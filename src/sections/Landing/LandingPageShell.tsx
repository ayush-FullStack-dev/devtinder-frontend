"use client";

import { useEffect, useRef, useState } from "react";
import LandingNavbar from "@/sections/Landing/Navbar/LandingNavbar";
import { cn } from "@/lib/utils";

const SECTION_IDS = [
    "home",
    "discover",
    "how-it-works",
    "why-devtinder",
    "frequently-asked-questions",
    "cta",
    "footer"
] as const;

type LandingPageShellProps = {
    children: React.ReactNode;
};

const LandingPageShell = ({ children }: LandingPageShellProps) => {
    const mainRef = useRef<HTMLElement>(null);
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const main = mainRef.current;
        if (!main) return;

        const sections = SECTION_IDS
            .map((id) => ({
                id,
                element: document.getElementById(id),
            }))
            .filter(
                (
                    item
                ): item is {
                    id: (typeof SECTION_IDS)[number];
                    element: HTMLElement;
                } => Boolean(item.element)
            );

        let frame = 0;

        const updateActiveSection = () => {
            frame = 0;

            const mainRect = main.getBoundingClientRect();
            const threshold = 120;

            let current = "hero";

            for (const { id, element } of sections) {
                const sectionRect = element.getBoundingClientRect();

                const sectionTop = sectionRect.top - mainRect.top;

                if (sectionTop <= threshold) {
                    current = id === "home" ? "hero" : id;
                } else {
                    break;
                }
            }

            setActiveSection((previous) =>
                previous === current ? previous : current
            );
        };

        const handleScroll = () => {
            if (frame) return;

            frame = requestAnimationFrame(updateActiveSection);
        };

        main.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        updateActiveSection();

        return () => {
            main.removeEventListener("scroll", handleScroll);

            if (frame) {
                cancelAnimationFrame(frame);
            }
        };
    }, []);

    return (
        <main
            ref={mainRef}
            id="main-scroll"
            className="
                relative
                z-0
                flex
                h-dvh
                w-full
                flex-col
                overflow-x-hidden
                overflow-y-auto
                bg-fixed-black
                scrollbar-hide
            "
        >

            <LandingNavbar
                isHide={activeSection === "hero"}
                theme={
                    !["why-devtinder", "discover", "cta"].includes(activeSection)
                        ? "dark"
                        : "light"
                }
            />

            {children}
        </main>
    );
};

export default LandingPageShell;
