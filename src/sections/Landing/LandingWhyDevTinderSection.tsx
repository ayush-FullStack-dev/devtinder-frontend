"use client";

import {
    googleSans,
    googleSansFlex,
} from "@/assets/fonts/font.google";
import ExpertiseShowcase from "@/components/shared/animation/ExpertiseShowcase";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScroll, } from "motion/react";
import {
    useEffect,
    useRef,
} from "react";

const LandingWhyDevTinderSection =
    () => {
        const scrollContainerRef = useRef<HTMLElement | null>(null);
        const reduceMotion = useReducedMotion()


        useEffect(() => {
            scrollContainerRef.current = document.getElementById("main-scroll");
        }, []);

        const sectionRef =
            useRef<HTMLElement>(null);
        const { scrollYProgress } = useScroll({
            container: scrollContainerRef,
            target: sectionRef,
            offset: ["start end", "end start"],
        });


        return (
            <section
                ref={sectionRef}
                className="
                    relative
                    flex
                    h-full
                    text-fixed-black
                    w-full
                    shrink-0
                    flex-col
                    overflow-visible
                    px-2
                    sm:items-center
                    lg:flex-row
                    lg:items-center
                    lg:p-6
                    xl:p-8
                    2xl:p-10
                    3xl:p-12
                    gap-10
                    5xl:p-16
                    7xl:p-20
                    10xl:p-24
                "
            >

                <div
                    className="
                        relative
                        z-30
                        flex
                        w-full
                        flex-col
                        gap-4
                        sm:gap-5
                        md:gap-6
                        lg:gap-[4vh]
                        lg:w-[55vw]
                        lg:max-w-262.5
                        xl:max-w-300
                        2xl:max-w-300
                        3xl:max-w-375
                        5xl:max-w-1750
                        7xl:max-w-2000
                        10xl:max-w-2300
                    "
                >
                    <h2
                        className={`
        ${googleSansFlex.className}
        pl-0
        text-sm
        leading-none
        text-green-brand
        xs:text-base
        sm:text-lg
        md:text-lg
        lg:pl-3
        lg:text-lg
        2xl:text-xl
        3xl:text-2xl
        5xl:text-3xl
        7xl:text-4xl
        10xl:text-5xl
    `}
                    >
                        WHY DEVTINDER
                    </h2>

                    <h1
                        className={`
                            ${googleSans.className}
                            w-full
                            shrink-0
                            font-bold
                            leading-[0.92]
                            tracking-[-0.04em]
                            text-[15vw]
                            xs:text-[14vw]
                            sm:text-[12vw]
                            md:text-[9vw]
                            lg:w-full
                            lg:text-[7.8vw]
                            lg:leading-[0.9]
                            xl:text-[7.5vw]
                            2xl:text-[7vw]
                            3xl:text-[6.5vw]
                            5xl:text-[6vw]
                            7xl:text-[5.5vw]
                            10xl:text-[5vw]
                        `}
                    >
                        Not another{" "}
                        <span className="text-green-brand">
                            developer{" "}
                        </span>
                        <span>
                            directory.
                        </span>
                    </h1>

                    <div
                        className={`
                            ${googleSansFlex.className}
                            w-full
                            text-sm
                            leading-relaxed
                            text-muted-foreground
                            xs:max-w-sm
                            xs:text-base
                            sm:max-w-md
                            sm:text-lg
                            md:max-w-lg
                            md:text-xl
                            lg:max-w-full
                            lg:text-2xl
                            3xl:text-[2.5vh]
                        `}
                    >
                        <p>
                            DevTinder is built
                            for real
                            connections.
                        </p>

                        <p>
                            No clutter. No
                            noise. Just the
                            right developers,
                        </p>

                        <p>
                            building the right
                            things, together.
                        </p>
                    </div>
                </div>


                <div
                    className="       
                            flex
                            w-[95vw]
                            aspect-square
                            sm:w-[90vw]
                            md:w-[80vw]
                            lg:h-[80dvh]
                            lg:w-[50vw]
                            xl:h-[85dvh]
                            2xl:h-[90dvh]
                            mt-auto
                            3xl:w-[45vw]
                            5xl:w-[40vw]
                            7xL:w-[35vw]
                            justify-center
                            max-h-650
                            items-center
                        "
                >
                    <ExpertiseShowcase
                        Progress={scrollYProgress}
                        backgroundSrc="/images/ExpertiseShowcase/bg.webp"
                        lightSrc="/images/ExpertiseShowcase/light.webp"
                        handSrc="/images/ExpertiseShowcase/hand.webp"
                        animatationAllow={!reduceMotion}
                    />
                </div>

            </section>
        );
    };

export default LandingWhyDevTinderSection;