"use client";

import { useEffect, useState } from "react";
import LandingNavbar from "../sections/Landing/LandingNavbar";
import HeroSection from "../sections/Landing/LandingHeroSection";
import DiscoverSection from "../sections/Landing/LandingDiscoverSection";
import LandingHowItWorksSection from "@/sections/Landing/LandingHowItWorksSection";
import LandingWhyDevTinderSection from "@/sections/Landing/LandingWhyDevTinderSection";
import LandingFaqSection from "@/sections/Landing/LandingFaqSection";

type LandingPageContentProps = {
    isLoggedIn: boolean;
};

const LandingPageContent = ({
    isLoggedIn,
}: LandingPageContentProps) => {
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const mainScroll =
            document.getElementById("main-scroll");

        if (!mainScroll) return;

        const sections = [
            {
                id: "home",
                active: "hero",
            },
            {
                id: "discover",
                active: "discover",
            },
            {
                id: "how-it-works",
                active: "how-it-works",
            },
            {
                id: "why-devtinder",
                active: "why-devtinder",
            },
            {
                id: "frequently-asked-questions",
                active: "frequently-asked-questions",
            },
        ];

        const elements = sections
            .map(({ id, active }) => {
                const element =
                    document.getElementById(id);

                return element
                    ? {
                          element,
                          active,
                      }
                    : null;
            })
            .filter(
                (
                    item
                ): item is {
                    element: HTMLElement;
                    active: string;
                } => item !== null
            );

        if (!elements.length) return;

        let frame: number | null = null;

        const updateActiveSection = () => {
            if (frame !== null) return;

            frame = requestAnimationFrame(() => {
                frame = null;

                const scrollTop = mainScroll.scrollTop;

                if (scrollTop <= 10) {
                    setActiveSection("hero");
                    return;
                }

                const mainRect =
                    mainScroll.getBoundingClientRect();

                const navbar =
                    document.querySelector("header");

                const navbarHeight =
                    navbar?.getBoundingClientRect().height ?? 80;

                const triggerPoint =
                    mainRect.top + navbarHeight + 10;

                let currentSection = elements[0];

                for (const section of elements) {
                    const rect =
                        section.element.getBoundingClientRect();

                    if (rect.top <= triggerPoint) {
                        currentSection = section;
                    } else {
                        break;
                    }
                }

                setActiveSection(
                    currentSection.active
                );
            });
        };

        updateActiveSection();

        mainScroll.addEventListener(
            "scroll",
            updateActiveSection,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            updateActiveSection
        );

        return () => {
            mainScroll.removeEventListener(
                "scroll",
                updateActiveSection
            );

            window.removeEventListener(
                "resize",
                updateActiveSection
            );

            if (frame !== null) {
                cancelAnimationFrame(frame);
                frame = null;
            }
        };
    }, []);

    return (
        <main
            id="main-scroll"
            className="
                relative
                flex
                h-dvh
                w-full
                flex-col
                gap-[5%]
                overflow-x-hidden
                overflow-y-auto
                bg-background
                scrollbar-hide
                lg:gap-30
            "
        >
            <LandingNavbar
                activeSection={activeSection}
            />

            <section
                id="home"
                className="
                    relative
                    min-h-dvh
                    w-full
                    shrink-0
                    overflow-hidden
                "
            >
                <video
                    className="
                        absolute
                        inset-0
                        z-0
                        h-full
                        w-full
                        object-cover
                    "
                    src="/videos/HeroSectionBg.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                />

                <div className="absolute inset-0 z-10">
                    <HeroSection />
                </div>
            </section>

            <section
                id="discover"
                className="
                    relative
                    min-h-dvh
                    w-full
                    shrink-0
                    py-10
                "
            >
                <DiscoverSection
                    isLoggedIn={isLoggedIn}
                />
            </section>

            <section
                id="how-it-works"
                className="
                    relative
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