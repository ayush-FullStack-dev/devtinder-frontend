"use client";

import { useEffect, useRef } from "react";
import {
    motion,
    useMotionValue,
    useTransform,
} from "motion/react";

import {
    googleSans,
    googleSansFlex,
} from "@/assets/fonts/font.google";

import MacWindowFrame from "@/components/shared/frames/MacWindowFrame";

const LandingHowItWorksSection = () => {
    const sectionRef = useRef<HTMLElement>(null);

    const scrollProgress = useMotionValue(0);

    useEffect(() => {
        const container = document.getElementById("main-scroll");

        if (!container) return;

        const updateProgress = () => {
            const section = sectionRef.current;

            if (!section) return;

            const containerRect =
                container.getBoundingClientRect();

            const sectionRect =
                section.getBoundingClientRect();

            const sectionTop =
                sectionRect.top - containerRect.top;

            const scrollDistance =
                Math.max(
                    1,
                    section.offsetHeight -
                        container.clientHeight
                );

            const progressValue = Math.max(
                0,
                Math.min(
                    1,
                    -sectionTop / scrollDistance
                )
            );

            scrollProgress.set(progressValue);
        };

        updateProgress();

        container.addEventListener(
            "scroll",
            updateProgress,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            updateProgress
        );

        return () => {
            container.removeEventListener(
                "scroll",
                updateProgress
            );

            window.removeEventListener(
                "resize",
                updateProgress
            );
        };
    }, [scrollProgress]);

    const textY = useTransform(
        scrollProgress,
        [0, 0.6],
        [0, -20]
    );

    const textOpacity = useTransform(
        scrollProgress,
        [0, 0.65],
        [1, 0]
    );

    const textScale = useTransform(
        scrollProgress,
        [0, 0.4],
        [1, 0.65]
    );

    return (
        <section
            ref={sectionRef}
            className="
                relative
                w-full
                min-h-[125svh]
                shrink-0
                xs:min-h-[130svh]
                sm:min-h-[135svh]
                md:min-h-[140svh]
                lg:min-h-[170svh]
                sm:px-4
            "
        >
            {/* Sticky Text */}
            <motion.div
                className="
                    sticky
                    top-0
                    z-0
                    flex
                    h-[100svh]
                    w-full
                    shrink-0
                    items-center
                    justify-center
                    lg:h-dvh
                "
            >
                <motion.div
                    style={{
                        opacity: textOpacity,
                        y: textY,
                        scale: textScale,
                    }}
                    className="
                        flex
                        w-full
                        shrink-0
                        flex-col
                        items-center
                        will-change-transform
                    "
                >
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.97,
                            filter: "blur(8px)",
                        }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                            filter: "blur(0px)",
                        }}
                        viewport={{
                            once: true,
                            amount: 0.15,
                        }}
                        transition={{
                            duration: 0.55,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="
                            flex
                            w-full
                            shrink-0
                            flex-col
                            items-center
                            will-change-transform
                        "
                    >
                        <motion.h2
                            initial={{
                                opacity: 0,
                                y: 10,
                                letterSpacing: "0.1em",
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                letterSpacing: "0em",
                            }}
                            viewport={{
                                once: true,
                            }}
                            transition={{
                                delay: 0.05,
                                duration: 0.4,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className={`
                                ${googleSansFlex.className}
                                text-base
                                text-green-brand
                                xs:text-lg
                                sm:text-xl
                            `}
                        >
                            HOW IT WORKS
                        </motion.h2>

                        <h1
                            className={`
                                ${googleSans.className}
                                flex
                                w-full
                                shrink-0
                                flex-col
                                items-center
                                text-center
                                text-4xl
                                font-bold
                                leading-[0.95]
                                tracking-tight
                                xs:text-[12vw]
                                sm:text-[12vw]
                                md:text-[11vw]
                                lg:text-[8vw]
                            `}
                        >
                            <motion.p
                                initial={{
                                    opacity: 0,
                                    y: 24,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                }}
                                transition={{
                                    delay: 0.1,
                                    duration: 0.45,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                From connection
                            </motion.p>

                            <motion.p
                                initial={{
                                    opacity: 0,
                                    y: 24,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                }}
                                transition={{
                                    delay: 0.16,
                                    duration: 0.45,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                to{" "}
                                <span className="text-green-brand">
                                    creation.
                                </span>
                            </motion.p>
                        </h1>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Video */}
            <div
                className="
                    relative
                    z-10
                    mt-[-12svh]
                    w-full
                    shrink-0
                    xs:mt-[-14svh]
                    sm:mt-[-16svh]
                    md:mt-[-8vh]
                "
            >
                {/* Tablet and Desktop */}
                <MacWindowFrame
                    className="
                        relative
                        mx-auto
                        hidden
                        w-full
                        shrink-0
                        overflow-hidden
                        sm:block
                        lg:max-w-[83vw]
                    "
                >
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        src="/videos/LandingHowItWorks.mp4"
                        className="
                            absolute
                            inset-0
                            h-full
                            w-full
                            object-cover
                        "
                    />

                    <div
                        className="
                            relative
                            z-10
                            aspect-video
                            w-full
                            shrink-0
                        "
                    />
                </MacWindowFrame>

                {/* Mobile */}
                <div
                    className="
                        relative
                        block
                        aspect-video
                        w-full
                        shrink-0
                        overflow-hidden
                        rounded-lg
                        sm:hidden
                    "
                >
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        src="/videos/LandingHowItWorks.mp4"
                        className="
                            absolute
                            inset-0
                            h-full
                            w-full
                            object-cover
                        "
                    />
                </div>
            </div>
        </section>
    );
};

export default LandingHowItWorksSection;