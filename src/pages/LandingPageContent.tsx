"use client";

import { useEffect, useRef, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
} from "motion/react";

import LandingNavbar from "@/sections/Landing/LandingNavbar";
import HeroSection from "@/sections/Landing/LandingHeroSection";
import DiscoverSection from "@/sections/Landing/LandingDiscoverSection";
import LandingHowItWorksSection from "@/sections/Landing/LandingHowItWorksSection";
import LandingWhyDevTinderSection from "@/sections/Landing/LandingWhyDevTinderSection";
import LandingFaqSection from "@/sections/Landing/LandingFaqSection";

import KineticMetalFlow from "@/animations/KineticMetalFlow";
import MagneticGrid from "@/animations/MagneticGrid";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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
    const mainRef = useRef<HTMLElement>(null);
    const transitionRef = useRef<HTMLElement>(null);

    const reduced = useReducedMotion();

    const [activeSection, setActiveSection] =
        useState("hero");

    const { scrollYProgress } = useScroll({
        container: mainRef,
        target: transitionRef,
        offset: ["start start", "end end"],
    });

    const heroScale = useTransform(
        scrollYProgress,
        [0, 1],
        [1, 0.78]
    );

    const heroY = useTransform(
        scrollYProgress,
        [0, 0.6],
        [0, -30]
    );

    useEffect(() => {
        const main = mainRef.current;

        if (!main) return;

        const sections = SECTION_IDS.map((id) => ({
            id,
            element: document.getElementById(id),
        })).filter(
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

            const scrollTop = main.scrollTop;
            const threshold = 100;

            let current = "hero";

            for (const { id, element } of sections) {
                if (
                    scrollTop >=
                    element.offsetTop - threshold
                ) {
                    current =
                        id === "home"
                            ? "hero"
                            : id;
                } else {
                    break;
                }
            }

            setActiveSection((previous) =>
                previous === current
                    ? previous
                    : current
            );
        };

        const handleScroll = () => {
            if (frame) return;

            frame = requestAnimationFrame(
                updateActiveSection
            );
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
                bg-background
                scrollbar-hide
            "
        >
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    top-0
                    z-0
                    h-[120dvh]
                    overflow-hidden
                "
            >
                <KineticMetalFlow />
            </div>

            <LandingNavbar
                activeSection={activeSection}
            />

            <section
                ref={transitionRef}
                className="
        relative
        z-10
        min-h-[200svh]
        w-full
        shrink-0
    "
            >
                <motion.div
                    style={
                        reduced
                            ? undefined
                            : {
                                scale: heroScale,
                                y: heroY,
                            }
                    }
                    className="
            sticky
            top-0
            h-dvh
            w-full
            overflow-hidden
            will-change-transform
        "
                >
                    <section
                        id="home"
                        className="
                relative
                h-dvh
                w-full
                overflow-hidden
            "
                    >
                        <HeroSection />
                    </section>
                </motion.div>

                <div
                    className="
            sticky
            top-0
            z-20
            w-full
        "
                >
                    <section
                        id="discover"
                        className="
                relative
                z-20
                w-full
                bg-background
                px-4
                pt-20
                pb-40
                sm:pt-24
                sm:pb-48
            "
                    >
                        <DiscoverSection
                            isLoggedIn={isLoggedIn}
                        />
                    </section>
                </div>
            </section>

            <section
                id="how-it-works"
                className="
                    relative
                    z-20
                    min-h-dvh
                    w-full
                    shrink-0
                    bg-background
                    py-10
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
                    bg-background
                    py-10
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
                    bg-background
                    py-10
                "
            >
                <LandingFaqSection />
            </section>
        </main>
    );
};

export default LandingPageContent;