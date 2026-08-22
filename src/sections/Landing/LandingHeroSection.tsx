"use client";

import { googleSans } from "@/assets/fonts/font.google";
import Link from "next/link";
import { motion } from "motion/react";
import AnimatedButton from "@/components/shared/AnimatedButton";

const HeroSection = () => {
    return (
        <section
            className="
                min-h-full
                shrink-0
                px-4
                pt-30
                flex
                flex-col
                items-center
                justify-center
            "
        >
            <div className="flex flex-col items-center gap-4 xs:gap-4">
                <motion.h1
                    id="hero-heading"
                    initial={{
                        opacity: 0,
                        y: 40,
                        filter: "blur(10px)",
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                    }}
                    transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`${googleSans.className}
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
                    <span className="block">Meet Build</span>

                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.25,
                            duration: 0.6,
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
                        y: 24,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.35,
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`${googleSans.className}
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
                        y: 20,
                        scale: 0.96,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                    }}
                    transition={{
                        delay: 0.5,
                        duration: 0.5,
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
                    <Link href="/signup" className="block w-full">
                        <AnimatedButton
                            className="
                                h-12
                                w-full
                                rounded-full
                                px-4
                                text-base
                                xs:h-13
                                xs:text-lg
                                sm:h-14
                                sm:text-xl
                                lg:h-15
                                lg:text-xl
                                xl:text-2xl
                                bg-green-brand
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