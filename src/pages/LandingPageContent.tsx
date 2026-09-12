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

        const sections = [
            "home",
            "discover",
            "how-it-works",
            "why-devtinder",
            "frequently-asked-questions",
        ];

        const handleScroll = () => {
            const scrollPosition =
                main.scrollTop +
                main.clientHeight * 0.35;

            let currentSection = "hero";

            for (const id of sections) {
                const section =
                    document.getElementById(id);

                if (!section) continue;

                const top =
                    section.offsetTop;

                const bottom =
                    top +
                    section.offsetHeight;

                if (
                    scrollPosition >= top &&
                    scrollPosition < bottom
                ) {
                    currentSection =
                        id === "home"
                            ? "hero"
                            : id;

                    break;
                }
            }

            setActiveSection(
                currentSection
            );
        };

        main.addEventListener(
            "scroll",
            handleScroll,
            { passive: true }
        );

        handleScroll();

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
                    h-[120dvh]
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