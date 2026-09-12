"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import LandingNavbar from "../sections/Landing/LandingNavbar";
import HeroSection from "../sections/Landing/LandingHeroSection";
import DiscoverSection from "../sections/Landing/LandingDiscoverSection";
import LandingHowItWorksSection from "@/sections/Landing/LandingHowItWorksSection";
import LandingWhyDevTinderSection from "@/sections/Landing/LandingWhyDevTinderSection";
import LandingFaqSection from "@/sections/Landing/LandingFaqSection";
import KineticMetalFlow from "@/animations/KineticMetalFlow";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type LandingPageContentProps = {
    isLoggedIn: boolean;
};

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
        [1, 0.75]
    );

    const heroY = useTransform(
        scrollYProgress,
        [0, 0.6],
        [0, -30]
    );

    useEffect(() => {
        const main = mainRef.current;

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

            let current = "hero";

            for (const id of sectionIds) {
                const section =
                    document.getElementById(id);

                if (!section) continue;

                if (
                    scrollTop >=
                    section.offsetTop - 80
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

        let frame = 0;

        const handleScroll = () => {
            if (frame) return;

            frame = requestAnimationFrame(() => {
                updateActiveSection();
                frame = 0;
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
                className="
                    absolute
                    inset-0
                    z-10
                    h-[110dvh]
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
                    z-20
                    h-[200svh]
                    w-full
                    shrink-0
                      mb-20
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
                        z-10
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
                            z-10
                            h-[110dvh]
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
                        z-30
                        h-dvh
                        w-full
                        bg-background
                        pt-[8vw]
                    "
                >
                    <section
                        id="discover"
                        className="
                            relative
                            z-30
                            h-dvh
                            w-full
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
                    z-30
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
                    z-40
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
                    z-40
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