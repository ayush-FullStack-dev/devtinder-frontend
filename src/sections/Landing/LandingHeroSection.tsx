"use client";

import { googleSans } from "@/assets/fonts/font.google";
import AnimatedButton from "@/components/shared/AnimatedButton";
import Link from "next/link";
import { motion } from "motion/react";

const HeroSection = () => {
    return (
        <section
            className="
                flex
                min-h-dvh
                shrink-0
                flex-col
                items-center
                justify-center
                px-4
                pt-30
            "
        >
            <div className="flex flex-col items-center gap-4">
                <motion.h1
                    id="hero-heading"
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`
                        ${googleSans.className}
                        text-center
                        font-semibold
                        leading-[0.95]
                        text-[17vw]
                        sm:text-[15vw]
                        md:text-[14vw]
                        lg:text-[13vw]
                        xl:text-[12vw]
                    `}
                >
                    <span className="block">
                        Meet Build
                    </span>

                    <motion.span
                        initial={{
                            opacity: 0,
                            y: 16,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.2,
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="block text-green-brand"
                    >
                        Ship.
                    </motion.span>
                </motion.h1>

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 18,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.3,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`
                        ${googleSans.className}
                        max-w-xs
                        text-center
                        text-sm
                        leading-relaxed
                        text-muted-foreground
                        xs:max-w-sm
                        xs:text-base
                        sm:max-w-md
                        sm:text-lg
                        md:max-w-lg
                        md:text-xl
                    `}
                >
                    <p>
                        DevTinder is where developers connect,
                        <br />
                        collaborate and build something real.
                    </p>
                </motion.div>

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 16,
                        scale: 0.98,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                    }}
                    transition={{
                        delay: 0.42,
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                        mt-4
                        w-full
                        max-w-xs
                        xs:max-w-sm
                        sm:w-110
                        sm:max-w-none
                        md:w-115
                        lg:w-120
                        xl:w-130
                    "
                >
                    <Link
                        href="/signup"
                        className="block w-full"
                    >
                        <AnimatedButton
                            className="
                                h-12
                                w-full
                                rounded-full
                                bg-green-brand
                                px-4
                                text-base
                                xs:h-13
                                xs:text-lg
                                sm:h-14
                                sm:text-xl
                                lg:h-15
                                lg:text-xl
                                xl:text-2xl
                            "
                            text="Get Started"
                        />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;