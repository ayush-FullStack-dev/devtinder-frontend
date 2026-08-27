"use client";

import { googleSans } from "@/assets/fonts/font.google";
import AnimatedButton from "@/components/shared/AnimatedButton";
import LandingDiscoverCard from "@/components/shared/Landing/LandingDiscoverCard";
import { DeveloperProfile, DeveloperProfilesDemoData } from "@/constants/landing";
import Link from "next/link";
import { motion } from "motion/react";
import { shuffle } from "@/helpers/shuffle";
import { useEffect, useState } from "react";

const LandingDiscoverSection = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    const [developers, setDevelopers] = useState<DeveloperProfile[]>(
        DeveloperProfilesDemoData
    );

    useEffect(() => {
        setDevelopers(shuffle(DeveloperProfilesDemoData));
    }, []);

    return (
        <div
            className="
                flex
                w-full
                shrink-0
                flex-col
                gap-10
                px-2
                sm:px-8
                md:gap-14
                md:px-12
                mb-5
                lg:flex-row
                lg:items-center
                lg:justify-around
                lg:gap-8
                lg:px-2
            "
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
                    gap-2
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
                    `}
                >
                    <p>
                        A lot can happen after your first
                    </p>

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
                        lg:max-w-lg
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
                    className="
                        mt-6
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
                            lg:w-90
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
                    sm:w-[80vw]
                    sm:self-center
                    lg:max-h-155
                    lg:w-[30vw]
                    lg:self-auto
                "
            >
                <LandingDiscoverCard
                    developers={developers}
                    className="h-full w-full"
                    isAllowedLike={isLoggedIn}
                />
            </motion.div>
        </div>
    );
};

export default LandingDiscoverSection;