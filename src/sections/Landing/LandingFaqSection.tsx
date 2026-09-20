"use client";

import { googleSans, googleSansFlex } from "@/assets/fonts/font.google";
import { helveticaNow } from "@/assets/fonts/font.helveticaNow";
import FaqAccordion from "@/components/shared/Landing/FaqAccordion";
import Link from "next/link";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LandingFaqSection = () => {
    const reduced = useReducedMotion();
    const ease = [0.22, 1, 0.36, 1] as const;

    const reveal = (y: number, delay = 0) =>
        reduced
            ? {
                  initial: false,
                  animate: {
                      opacity: 1,
                      y: 0,
                  },
                  transition: {
                      duration: 0,
                  },
              }
            : {
                  initial: {
                      opacity: 0,
                      y,
                  },
                  whileInView: {
                      opacity: 1,
                      y: 0,
                  },
                  viewport: {
                      once: true,
                      amount: 0.2,
                  },
                  transition: {
                      delay,
                      duration: 0.5,
                      ease,
                  },
              };

    return (
        <section className="w-full flex flex-col items-center lg:items-start lg:flex-row lg:justify-around">
            <div
                className="
                    relative z-30 w-full flex py-5 lg:pl-0 pl-5
                    flex-col gap-6 sm:gap-7 md:gap-8
                    lg:w-[50vw] lg:gap-[4vh]
                    xl:max-w-[42vw] 2xl:max-w-[38vw]
                    3xl:max-w-[36vw] 4xl:max-w-[35vw]
                    5xl:max-w-[34vw] 7xl:max-w-[32vw]
                    8xl:max-w-[31vw] 9xl:max-w-[30vw]
                    10xl:max-w-[29vw] max-lg:hidden
                "
            >
                <motion.h2
                    {...reveal(10, 0)}
                    className={`
                        ${googleSansFlex.className}
                        leading-none tracking-[0.01em] text-green-brand
                        text-sm xs:text-base sm:text-lg md:text-lg
                        lg:text-lg xl:text-xl 2xl:text-2xl
                        3xl:text-3xl 4xl:text-4xl 5xl:text-4xl
                        7xl:text-5xl 8xl:text-6xl 9xl:text-7xl
                        10xl:text-8xl
                    `}
                >
                    FAQ
                </motion.h2>

                <motion.h1
                    {...reveal(22, 0.08)}
                    className={`
                        ${helveticaNow.className}
                        flex w-full shrink-0 flex-col
                        font-black leading-[0.9]
                        tracking-[-0.02em]
                        text-4xl xs:text-[12vw] sm:text-[12vw]
                        md:text-[11vw] lg:text-[8vw]
                        xl:text-[7.6vw] 2xl:text-[7.2vw]
                        3xl:text-[6.8vw] 4xl:text-[6.5vw]
                        5xl:text-[6.3vw] 7xl:text-[5.9vw]
                        8xl:text-[5.7vw] 9xl:text-[5.5vw]
                        10xl:text-[5.3vw]
                    `}
                >
                    <span className="block">
                        Everything{" "}
                        <span className="whitespace-nowrap">
                            you need
                        </span>
                    </span>

                    <span className="block">
                        to{" "}
                        <span className="whitespace-nowrap text-green-brand">
                            know.
                        </span>
                    </span>
                </motion.h1>

                <motion.p
                    {...reveal(14, 0.16)}
                    className={`
                        ${googleSans.className}
                        w-100 tracking-[-0.01em]
                        leading-relaxed text-muted-foreground
                        text-sm xs:text-base sm:text-lg
                        md:text-xl lg:max-w-full lg:text-2xl
                        4xl:w-full 4xl:text-[2vw]
                    `}
                >
                    Quick answers to common questions about{" "}
                    <Link
                        href="/"
                        className="
                            text-green-brand
                            transition-opacity
                            duration-200
                            hover:opacity-80
                        "
                    >
                        DevTinder
                    </Link>
                    .
                </motion.p>
            </div>

            <motion.div
                {...reveal(16, 0)}
                className={`
                    hidden max-lg:block w-[95%]
                    ${googleSansFlex.className}
                    text-center mb-5 text-[9vw]
                    sm:text-[8vw] font-medium leading-none
                `}
            >
                Frequently Asked Questions
            </motion.div>

            <motion.div
                {...reveal(36, 0.08)}
                viewport={{
                    once: true,
                    amount: 0.1,
                }}
                className="
                    mt-10
                    w-[95%]
                    lg:mt-[5%]
                    3xl:[4xl]
                    5xl:[3xl]
                    lg:w-[35vw]
                "
            >
                <FaqAccordion />
            </motion.div>
        </section>
    );
};

export default LandingFaqSection;