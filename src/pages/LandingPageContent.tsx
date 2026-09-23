"use client";

import { useEffect, useRef, useState } from "react";

import LandingNavbar from "@/sections/Landing/Navbar/LandingNavbar";
import HeroSection from "@/sections/Landing/LandingHeroSection";
import DiscoverSection from "@/sections/Landing/LandingDiscoverSection";
import LandingHowItWorksSection from "@/sections/Landing/LandingHowItWorksSection";
import LandingWhyDevTinderSection from "@/sections/Landing/LandingWhyDevTinderSection";
import LandingFaqSection from "@/sections/Landing/LandingFaqSection";

type LandingPageContentProps = {
    isLoggedIn: boolean;
};

const SECTION_IDS = [
    "home",
    "discover",
    "how-it-works",
    "why-devtinder",
    "frequently-asked-questions",
] as const;

const LandingPageContent = ({
    isLoggedIn,
}: LandingPageContentProps) => {
    const mainRef =
        useRef<HTMLElement>(null);
    const [activeSection, setActiveSection] =
        useState("hero");

    useEffect(() => {
        const main = mainRef.current;

        if (!main) return;

        const sections = SECTION_IDS
            .map((id) => ({
                id,
                element:
                    document.getElementById(id),
            }))
            .filter(
                (
                    item
                ): item is {
                    id: (typeof SECTION_IDS)[number];
                    element: HTMLElement;
                } =>
                    Boolean(item.element)
            );

        let frame = 0;

        const updateActiveSection = () => {
            frame = 0;

            const scrollTop =
                main.scrollTop;

            const threshold = 120;

            let current = "hero";

            for (
                const {
                    id,
                    element,
                } of sections
            ) {
                if (
                    scrollTop >=
                    element.offsetTop -
                    threshold
                ) {
                    current =
                        id === "home"
                            ? "hero"
                            : id;
                } else {
                    break;
                }
            }

            setActiveSection(
                (previous) =>
                    previous === current
                        ? previous
                        : current
            );
        };

        const handleScroll = () => {
            if (frame) return;

            frame =
                requestAnimationFrame(
                    updateActiveSection
                );
        };

        main.addEventListener(
            "scroll",
            handleScroll,
            {
                passive: true,
            }
        );

        updateActiveSection();

        return () => {
            main.removeEventListener(
                "scroll",
                handleScroll
            );

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
            {activeSection !== "hero" && <LandingNavbar theme={!["why-devtinder", "discover"].includes(activeSection) ? "dark" : "light"} />}

            <section
                id="home"
                className="
                    relative
                    z-10
                    w-full
                    shrink-0
                    mb-30
                "
            >
                <HeroSection
                    scrollContainerRef={
                        mainRef
                    }
                />
            </section>

            <section
                id="discover"
                className="
        relative
        z-20
        w-full
        shrink-0
        bg-fixed-white
        overflow-hidden
        rounded-4xl
        px-4
        py-10
        my-5
    "
            >
                <DiscoverSection
                    isLoggedIn={
                        isLoggedIn
                    }
                />
            </section>

            <section
                id="how-it-works"
                className="
                    relative
                    z-70
                    min-h-dvh
                    w-full
                    shrink-0
                    my-10
                "
            >
                <LandingHowItWorksSection />
            </section>

            <section
                id="why-devtinder"
                className="
                    relative
                    z-20
                    min-h-dvh
                    w-full
                    shrink-0
                    bg-fixed-white
                    overflow-hidden
                    rounded-4xl
                    my-10
                "
            >
                <LandingWhyDevTinderSection />
            </section>

            <section
                id="frequently-asked-questions"
                className="
                    relative
                    z-30
                    min-h-dvh
                    w-full
                    shrink-0
                 text-fixed-white
                    my-10
                "
            >
                <LandingFaqSection />
            </section>
        </main>
    );
};

export default LandingPageContent;