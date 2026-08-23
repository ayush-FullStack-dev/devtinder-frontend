"use client";

import { googleSans } from "@/assets/fonts/font.google";
import AnimatedButton from "@/components/shared/AnimatedButton";
import LandingDiscoverCard from "@/components/shared/Landing/LandingDiscoverCard";
import { DeveloperProfilesDemoData } from "@/constants/landing";
import Link from "next/link";
import { motion } from "motion/react";

const DiscoverSection = () => {
    return (
        <section
            id="discover"
            className="
                shrink-0
                w-full
                flex
                flex-col
                gap-10
                py-10
                px-2

                sm:px-8
                md:gap-14
                md:px-12

                lg:gap-8
                lg:px-2
                lg:py-0
                lg:flex-row
                lg:items-center
                lg:justify-around
            "
        >
            <motion.div
                initial={{
                    opacity: 0,
                    x: -60,
                    filter: "blur(8px)",
                }}
                whileInView={{
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)",
                }}
                viewport={{
                    once: true,
                    amount: 0.25,
                }}
                transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col gap-2 -mt-5"
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
                        lg:text-[8vw]
                        lg:max-w-[50vw]
                    `}
                >
                    <p>A lot can happen after your first</p>

                    <p className="text-green-brand">connection.</p>
                </div>

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.25,
                    }}
                    transition={{
                        delay: 0.15,
                        duration: 0.6,
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
                    x: 60,
                    y: 20,
                    scale: 0.96,
                }}
                whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                }}
                viewport={{
                    once: true,
                    amount: 0.2,
                }}
                transition={{
                    duration: 0.85,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="
                    self-auto
                    w-full
                    h-[70vw]
                    min-h-155
                    sm:w-[80vw]
                    sm:self-center
                    lg:w-[30vw]
                    lg:max-h-150
                    lg:self-auto
                "
            >
                <LandingDiscoverCard
                    developers={DeveloperProfilesDemoData}
                    className="h-full w-full"
                />
            </motion.div>
        </section>
    );
};

export default DiscoverSection;