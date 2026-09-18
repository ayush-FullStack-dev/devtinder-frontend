"use client";

import { googleSans } from "@/assets/fonts/font.google";
import AnimatedButton from "@/components/shared/animation/AnimatedButton";
import LandingDiscoverCard from "@/components/shared/Landing/LandingDiscoverCard";
import {
    DeveloperProfile,
    DeveloperProfilesDemoData,
} from "@/constants/landing";
import { shuffle } from "@/helpers/shuffle";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LandingDiscoverSection = ({
    isLoggedIn,
}: {
    isLoggedIn: boolean;
}) => {
    const [developers, setDevelopers] = useState<DeveloperProfile[]>(
        DeveloperProfilesDemoData
    );
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const reduced = useReducedMotion();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.15,
                rootMargin: "-8% 0px -8% 0px",
            }
        );

        const section = sectionRef.current;

        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        setDevelopers(shuffle(DeveloperProfilesDemoData));
    }, []);

    const ease = [0.22, 1, 0.36, 1] as const;

    return (
        <section
            ref={sectionRef}
            className="
        flex
        w-full
        shrink-0
        flex-col
        gap-[3vh]
        px-2
        pt-[2vh]
        sm:px-8
        sm:pt-[3vh]
        md:gap-[4vh]
        md:px-12
        md:pt-[3vh]
        mb-3
        lg:flex-row
        lg:items-center
        lg:justify-around
        lg:gap-[2.5vh]
        lg:px-2
        lg:pt-0
        3xl:gap-[3vh]
        5xl:gap-[4vh]
        7xl:gap-[5vh]
    "
        >
            <motion.div
                initial={{
                    opacity: 0,
                    x: reduced ? 0 : -32,
                }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                    x: isVisible || reduced ? 0 : -32,
                }}
                transition={{
                    duration: reduced ? 0 : 0.65,
                    ease,
                }}
                className="
                    -mt-5
                    flex
                    flex-col
                    gap-[1.5vh]
                    will-change-transform
                    3xl:gap-[2vh]
                    5xl:gap-[2.5vh]
                    7xl:gap-[3vh]
                "
            >
                <div
                    className={`
                        ${googleSans.className}
                        w-full
                        text-sm
                        leading-none
                        tracking-[0.01em]
                        ml-5
                        m-3
                        text-green-brand
                        xs:text-base
                        sm:text-lg
                        md:text-lg
                        lg:text-lg
                        2xl:text-xl
                        3xl:text-2xl
                        5xl:text-3xl
                        7xl:text-4xl
                        10xl:text-5xl
                    `}
                >
                    DISCOVER
                </div>

                <div
                    className={`
                        ${googleSans.className}
                        w-full
                        min-w-0
                        font-bold
                        leading-[0.95]
                        tracking-tight
                        text-4xl
                        xs:text-5xl
                        sm:text-6xl
                        md:text-7xl
                        lg:w-[47vw]
                        lg:max-w-[47vw]
                        lg:text-[7.2vw]
                        3xl:w-[44vw]
                        3xl:max-w-[44vw]
                        3xl:text-[6.3vw]
                        5xl:w-[42vw]
                        5xl:max-w-[42vw]
                        5xl:text-[5.9vw]
                        7xl:w-[40vw]
                        7xl:max-w-[40vw]
                        7xl:text-[5.5vw]
                        10xl:w-[38vw]
                        10xl:max-w-[38vw]
                        10xl:text-[5.1vw]
                    `}
                >
                    <p>A lot can happen after your first</p>

                    <p className="text-green-brand">
                        connection.
                    </p>
                </div>

                <div
                    className={`
                        ${googleSans.className}
                        max-w-full
                        text-sm
                        leading-relaxed
                        text-muted-foreground
                        xs:text-base
                        sm:text-lg
                        md:text-xl
                        lg:ml-2
                        lg:text-2xl
                        3xl:text-[2.5vh]
                        5xl:text-[2.7vh]
                        7xl:text-[3vh]
                        10xl:text-[3.2vh]
                    `}
                >
                    <p>
                        Meet developers. Exchange ideas.
                        <br />
                        Find something worth building.
                    </p>
                </div>

                <div className="mt-[1vh] lg:mt-[1.5vh]">
                    <Link
                        href="/discover/feed"
                        rel="noopener noreferrer"
                        className="
                            ml-2
                            self-start
                            xs:self-center
                            lg:self-start
                        "
                    >
                        <AnimatedButton
                            text="Start Connecting"
                            className="
                                h-11
                                w-[90vw]
                                rounded-full
                                bg-green-brand
                                px-6
                                text-center
                                font-bold
                                xs:w-[70vw]
                                sm:h-13
                                sm:text-lg
                                lg:w-88
                                lg:h-14
                                lg:text-lg
                                xl:w-100
                                xl:h-15
                                xl:text-lg
                                2xl:w-110
                                2xl:h-16
                                2xl:text-xl
                                3xl:w-[23vw]
                                3xl:h-[6.5vh]
                                3xl:text-[2vh]
                                5xl:w-[21vw]
                                5xl:h-[7vh]
                                5xl:text-[2.3vh]
                                7xl:w-[20vw]
                                7xl:h-[7.5vh]
                                7xl:text-[2.5vh]
                                10xl:w-[18vw]
                                10xl:h-[8vh]
                                10xl:text-[2.8vh]
                            "
                        />
                    </Link>
                </div>
            </motion.div>

            <motion.div
                initial={{
                    opacity: 0,
                    x: reduced ? 0 : 28,
                    scale: reduced ? 1 : 0.985,
                }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                    x: isVisible || reduced ? 0 : 28,
                    scale: isVisible || reduced ? 1 : 0.985,
                }}
                transition={{
                    duration: reduced ? 0 : 0.7,
                    ease,
                }}
                className="
                    h-[min(70vw,620px)]
                    min-h-155
                    w-full
                    self-auto
                    will-change-transform
                    sm:w-[80vw]
                    sm:self-center
                    lg:w-[40vw]
                    xl:w-[35vw]
                    2xl:w-[32vw]
                    lg:max-h-155
                    3xl:min-h-0
                    4xl:w-[33vw]
                    3xl:max-h-none
                    3xl:h-[min(55vh,900px)]
                    5xl:h-[min(60vh,1500px)]
                    7xl:h-[min(65vh,2000px)]
                    lg:self-auto
                "
            >
                <LandingDiscoverCard
                    developers={developers}
                    className="h-full w-full min-h-155"
                    isAllowedLike={isLoggedIn}
                    isVisible={isVisible}
                />
            </motion.div>
        </section>
    );
};

export default LandingDiscoverSection;