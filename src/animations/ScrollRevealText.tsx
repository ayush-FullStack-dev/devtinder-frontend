"use client"

import { googleSans } from "@/assets/fonts/font.google";
import {
    motion,
    useMotionValueEvent,
    useTransform,
} from "motion/react";
import { useState } from "react";

const AnimatedWord = ({
    children,
    groupIndex,
    totalGroups,
    progress,
    reducedMotion,
    isFirst = false,
    extraAnimation
}: {
    children: React.ReactNode;
    groupIndex: number;
    totalGroups: number;
    progress: any;
    reducedMotion: boolean;
    isFirst?: boolean;
    extraAnimation: boolean
}) => {
    const start = groupIndex / totalGroups;
    const end = Math.min((groupIndex + 1.5) / totalGroups, 1);
    const blur = useTransform(
        progress,
        [start, end],
        [isFirst && extraAnimation ? "blur(2px)" : "blur(12px)", "blur(0px)"]
    );

    const opacity = useTransform(
        progress,
        [start, end],
        [isFirst && extraAnimation ? 0.65 : 0.35, 1]
    );

    return (
        <motion.span
            style={{
                filter: reducedMotion ? "blur(0px)" : blur,
                opacity: reducedMotion ? 1 : opacity,
            }}
        >
            {children}
        </motion.span>
    );
};

const ScrollRevealText = ({
    progress,
    reducedMotion,
    words,
    className = "",
    groupSize = 2,
    extraAnimation = true
}: {
    progress: any;
    reducedMotion: boolean;
    words: string[];
    className?: string;
    groupSize?: number;
    extraAnimation?: boolean
}) => {
    const [visible, setVisible] = useState(false);

    const totalGroups = Math.ceil(words.length / groupSize);

    useMotionValueEvent(progress, "change", (latest: number) => {
        setVisible(latest >= 0.1);
    });

    return (
        <motion.span
            initial={{
                opacity: 0,
                y: reducedMotion ? 0 : 20,
            }}
            animate={{
                opacity: visible ? 1 : 0,
                y: visible || reducedMotion ? 0 : 20,
            }}
            transition={
                reducedMotion
                    ? { duration: 0 }
                    : {
                        duration: visible ? 0.6 : 0.25,
                        ease: [0.22, 1, 0.36, 1],
                    }
            }
            className={`${googleSans.className} relative flex w-fit gap-[0.3em] ${className}`}
        >
            {words.map((word, index) => {
                const groupIndex = Math.floor(index / groupSize);

                return (
                    <AnimatedWord
                        key={`${word}-${index}`}
                        groupIndex={groupIndex}
                        totalGroups={totalGroups}
                        progress={progress}
                        reducedMotion={reducedMotion}
                        isFirst={index === 0}
                        extraAnimation={extraAnimation}
                    >
                        {word}
                    </AnimatedWord>
                );
            })}
        </motion.span>
    );
};

export default ScrollRevealText