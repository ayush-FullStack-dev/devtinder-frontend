"use client";

import { useEffect, useState } from "react";
import LandingNavbar from "../sections/Landing/LandingNavbar";
import HeroSection from "../sections/Landing/LandingHeroSection";
import DiscoverSection from "../sections/Landing/LandingDiscoverSection";
import LandingHowItWorksSection from "@/sections/Landing/LandingHowItWorksSection";
import LandingWhyDevTinderSection from "@/sections/Landing/LandingWhyDevTinderSection";
import LandingFaqSection from "@/sections/Landing/LandingFaqSection";
import MagneticGrid from "@/animations/MagneticGrid";
import KineticMetalFlow from "@/animations/KineticMetalFlow";

type LandingPageContentProps = {
    isLoggedIn: boolean;
};

const LandingPageContent = ({
    isLoggedIn,
}: LandingPageContentProps) => {
    const [activeSection, setActiveSection] =
        useState("hero");

    useEffect(() => {
        const main =
            document.getElementById(
                "main-scroll"
            );

        if (!main) return;

        const sectionIds = [
            "home",
            "discover",
            "how-it-works",
            "why-devtinder",
            "frequently-asked-questions",
        ];

        const updateActiveSection = () => {
            const scrollTop = main.scrollTop;
            const sections = sectionIds
                .map((id) =>
                    document.getElementById(id)
                )
                .filter(
                    (
                        section
                    ): section is HTMLElement =>
                        section !== null
                );

            let current = "hero";

            for (const section of sections) {
                if (
                    scrollTop >=
                    section.offsetTop - 80
                ) {
                    current =
                        section.id === "home"
                            ? "hero"
                            : section.id;
                } else {
                    break;
                }
            }

            setActiveSection(current);
        };

        let ticking = false;

        const handleScroll = () => {
            if (ticking) return;

            ticking = true;

            requestAnimationFrame(() => {
                updateActiveSection();
                ticking = false;
            });
        };

        main.addEventListener(
            "scroll",
            handleScroll,
            { passive: true }
        );

        updateActiveSection();

        return () => {
            main.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, []);

    return (
        <main
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
                bg-background
                scrollbar-hide
            "
        >
            <div
                className="
                    pointer-events-none
                    fixed
                    inset-0
                    z-0
                "
            >
                <MagneticGrid />
            </div>

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-10
                    h-dvh
                    lg:h-[110dvh]
                    xl:h-[125dvh]
                "
            >
                <KineticMetalFlow />
            </div>

            <div className="relative z-40">
                <LandingNavbar
                    activeSection={
                        activeSection
                    }
                />
            </div>

            <section
                id="home"
                className="
                    relative
                    z-20
                    min-h-[125dvh]
                    w-full
                    shrink-0
                    overflow-hidden
                "
            >
                <HeroSection />
            </section>

            <section
                id="discover"
                className="
                    relative
                    z-20
                    min-h-dvh
                    w-full
                    shrink-0
                    py-10
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
                    z-20
                    min-h-dvh
                    w-full
                    shrink-0
                    pb-10
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
                    py-10
                "
            >
                <LandingWhyDevTinderSection />
            </section>

            <section
                id="frequently-asked-questions"
                className="
                    relative
                    z-20
                    min-h-dvh
                    w-full
                    shrink-0
                    py-10
                "
            >
                <LandingFaqSection />
            </section>
        </main>
    );
};

export default LandingPageContent;