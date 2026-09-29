"use client";

import { googleSans } from "@/assets/fonts/font.google";
import { motion } from "motion/react";

type RevealTextProps = {
    words: string[];
    className?: string;
    groupSize?: number;
    groupDelay?: number;
    duration?: number;
    extraAnimation?: boolean;
    trigger?: boolean;
    reducedMotion?: boolean;
};

const RevealText = ({
    words,
    className = "",
    groupSize = 2,
    groupDelay = 0.08,
    duration = 0.55,
    extraAnimation = true,
    trigger = true,
    reducedMotion = false,
}: RevealTextProps) => {
    return (
        <span
            className={`${googleSans.className} ${className}`}
        >
            {words.map((word, index) => {
                const groupIndex = Math.floor(index / groupSize);

                const initialBlur = "blur(12px)";

                const initialOpacity = 0

                return (
                    <motion.span
                        key={`${word}-${index}`}
                        initial={
                            reducedMotion
                                ? {
                                      opacity: 1,
                                      filter: "blur(0px)",
                                  }
                                : {
                                      opacity: initialOpacity,
                                      filter: initialBlur,
                                  }
                        }
                        animate={
                            trigger
                                ? {
                                      opacity: 1,
                                      filter: "blur(0px)",
                                  }
                                : {
                                      opacity: initialOpacity,
                                      filter: initialBlur,
                                  }
                        }
                        transition={{
                            duration: reducedMotion ? 0 : duration,
                            delay: reducedMotion
                                ? 0
                                : groupIndex * groupDelay,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="inline-block"
                    >
                        {word}
                        {index < words.length - 1 && "\u00A0"}
                    </motion.span>
                );
            })}
        </span>
    );
};

export default RevealText;