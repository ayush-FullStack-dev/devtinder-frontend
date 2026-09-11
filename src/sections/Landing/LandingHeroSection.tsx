"use client";

import { googleSans } from "@/assets/fonts/font.google";
import AnimatedButton from "@/components/shared/AnimatedButton";
import Link from "next/link";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HeroSection = () => {
    const reduced = useReducedMotion();

    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);

    const springConfig = { stiffness: 60, damping: 22, mass: 0.6 };
    const smoothX = useSpring(rawX, springConfig);
    const smoothY = useSpring(rawY, springConfig);

    const headlineX = useTransform(smoothX, (v) => v * 0.012);
    const headlineY = useTransform(smoothY, (v) => v * 0.012);
    const subX = useTransform(smoothX, (v) => v * 0.007);
    const subY = useTransform(smoothY, (v) => v * 0.007);
    const ctaX = useTransform(smoothX, (v) => v * 0.005);
    const ctaY = useTransform(smoothY, (v) => v * 0.005);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (reduced) return;

        const handlePointer = (e: PointerEvent) => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            rawX.set(e.clientX - cx);
            rawY.set(e.clientY - cy);
        };

        window.addEventListener("pointermove", handlePointer, {
            passive: true,
        });
        return () =>
            window.removeEventListener("pointermove", handlePointer);
    }, [reduced, rawX, rawY]);

    const ease = [0.22, 1, 0.36, 1] as const;

    return (
        <div
            ref={containerRef}
            className="
                flex
                min-h-dvh
                shrink-0
                flex-col
                items-center
                justify-center
                px-4
                pt-25
            "
        >
            <div className="flex flex-col items-center gap-[4vh]">
                <motion.h1
                    id="hero-heading"
                    initial={{ opacity: 0, y: reduced ? 0 : 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, ease }}
                    style={
                        reduced
                            ? undefined
                            : { x: headlineX, y: headlineY }
                    }
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
                        will-change-transform
                    `}
                >
                    <motion.span
                        className="block"
                        initial={{ opacity: 0, y: reduced ? 0 : 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, ease }}
                    >
                        Meet Build
                    </motion.span>

                    <motion.span
                        initial={{ opacity: 0, y: reduced ? 0 : 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.18,
                            duration: 0.55,
                            ease,
                        }}
                        className="
                            block
                            text-green-brand
                            will-change-transform
                        "
                    >
                        Ship.
                    </motion.span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: reduced ? 0 : 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.32, duration: 0.5, ease }}
                    style={
                        reduced ? undefined : { x: subX, y: subY }
                    }
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
                        lg:max-w-full
                        lg:text-2xl
                        3xl:text-[2.5vh]
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
                        y: reduced ? 0 : 16,
                        scale: reduced ? 1 : 0.98,
                    }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.44, duration: 0.48, ease }}
                    style={
                        reduced ? undefined : { x: ctaX, y: ctaY }
                    }
                    className="
                        mt-4
                        w-full
                        max-w-xs
                        will-change-transform
                        xs:max-w-sm
                        sm:w-110
                        sm:max-w-none
                        md:w-115
                        lg:w-125
                        xl:w-140
                        2xl:w-150
                        3xl:w-[55vw]
                        8xl:w-[35vw]
                    "
                >
                    <Link
                        href="/auth/signup"
                        target="_blank"
                        rel="noopener noreferrer"
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
                                xl:h-16
                                xl:text-2xl
                                2xl:h-17
                                2xl:text-2xl
                                3xl:h-[7vh]
                                3xl:text-[2.2vh]
                                5xl:h-[7.5vh]
                                5xl:text-[2.5vh]
                                7xl:h-[8vh]
                                7xl:text-[2.7vh]
                                10xl:h-[8.5vh]
                                10xl:text-[3vh]
                            "
                            text="Get Started"
                        />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;
