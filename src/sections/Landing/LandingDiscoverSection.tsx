"use client";

import { googleSans } from "@/assets/fonts/font.google";
import AnimatedButton from "@/components/shared/AnimatedButton";
import LandingDiscoverCard from "@/components/shared/Landing/LandingDiscoverCard";
import {
    DeveloperProfile,
    DeveloperProfilesDemoData,
} from "@/constants/landing";
import { shuffle } from "@/helpers/shuffle";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

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

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.3,
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        setDevelopers(shuffle(DeveloperProfilesDemoData));
    }, []);

    return (
        <section
            className="
                flex
                w-full
                shrink-0
                flex-col
                gap-[4vh]
                px-2
                sm:px-8
                md:gap-[5vh]
                md:px-12
                mb-5
                lg:flex-row
                lg:items-center
                lg:justify-around
                lg:gap-[3vh]
                lg:px-2
                3xl:gap-[4vh]
                5xl:gap-[5vh]
                7xl:gap-[6vh]
            "
            ref={sectionRef}
        >
            <motion.div
                initial={{
                    opacity: 0,
                    x: -40,
                }}
                whileInView={{
                    opacity: 1,
                    x: 0,
                }}
                viewport={{
                    once: true,
                    amount: 0.1,
                }}
                transition={{
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="
                    -mt-5
                    flex
                    flex-col
                    gap-[2vh]
                    will-change-transform
                    3xl:gap-[2.5vh]
                    5xl:gap-[3vh]
                    7xl:gap-[3.5vh]
                "
            >
                <div
                    className={`
                        ${googleSans.className}
                        w-full
                        font-bold
                        leading-[0.95]
                        tracking-tight
                        text-5xl
                        xs:text-6xl
                        sm:text-7xl
                        md:text-8xl
                        lg:max-w-[50vw]
                        lg:text-[8vw]
                        3xl:text-[7vw]
                        5xl:text-[6.5vw]
                        7xl:text-[6vw]
                        10xl:text-[5.5vw]
                    `}
                >
                    <p>A lot can happen after your first</p>

                    <p className="text-green-brand">
                        connection.
                    </p>
                </div>

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 14,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.1,
                    }}
                    transition={{
                        delay: 0.08,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                    }}
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
                </motion.div>

                <Link
                    href="/discover/feed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        mt-[2vh]
                        ml-2
                        self-start
                        xs:self-center
                        lg:self-start
                    "
                >
                    <AnimatedButton
                        text="Start Connecting"
                        className="
                            h-12
                            w-[90vw]
                            rounded-full
                            bg-green-brand
                            px-6
                            text-center
                            font-bold
                            xs:w-[70vw]
                            sm:h-14
                            sm:text-lg
                            lg:w-90
                            lg:h-15
                            lg:text-xl
                            xl:w-100
                            xl:h-16
                            xl:text-xl
                            2xl:w-110
                            2xl:h-17
                            2xl:text-2xl
                            3xl:w-[24vw]
                            3xl:h-[7vh]
                            3xl:text-[2.2vh]
                            5xl:w-[22vw]
                            5xl:h-[7.5vh]
                            5xl:text-[2.5vh]
                            7xl:w-[20vw]
                            7xl:h-[8vh]
                            7xl:text-[2.7vh]
                            10xl:w-[18vw]
                            10xl:h-[8.5vh]
                            10xl:text-[3vh]
                        "
                    />
                </Link>
            </motion.div>

            <motion.div
                initial={{
                    opacity: 0,
                    x: 40,
                    scale: 0.98,
                }}
                whileInView={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                }}
                viewport={{
                    once: true,
                    amount: 0.08,
                }}
                transition={{
                    duration: 0.7,
                    delay: 0.05,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="
                    h-[min(70vw,620px)]
                    min-h-155
                    w-full
                    self-auto
                    will-change-transform
                    sm:w-[80vw]
                    sm:self-center
                    lg:w-[30vw]
                    lg:max-h-155
                    3xl:min-h-0
                    3xl:max-h-none
                    3xl:h-[min(55vh,900px)]
                    5xl:h-[min(60vh,1500px)]
                    7xl:h-[min(65vh,2000px)]
                    lg:self-auto
                "
            >
                <LandingDiscoverCard
                    developers={developers}
                    className="h-full w-full"
                    isAllowedLike={isLoggedIn}
                    isVisible={isVisible}
                />
            </motion.div>
        </section>
    );
};

export default LandingDiscoverSection;