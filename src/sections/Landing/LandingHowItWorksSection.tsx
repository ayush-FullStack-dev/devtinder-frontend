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
                section.offsetHeight -
                container.clientHeight;

            if (scrollDistance <= 0) return;

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
        [0, 0.4],
        [0, -80]
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
                min-h-[140vh]
                w-full
                shrink-0
                sm:px-4
                lg:min-h-[170vh]
            "
        >
            <motion.div
                className="
                    sticky
                    top-0
                    z-0
                    flex
                    h-[60dvh]
                    w-full
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
                                text-xl
                                text-green-brand
                            `}
                        >
                            HOW IT WORKS
                        </motion.h2>

                        <h1
                            className={`
                                ${googleSans.className}
                                flex
                                w-full
                                flex-col
                                items-center
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

            <div
                className="
                    relative
                    z-10
                    mt-[-8vh]
                    isolate
                "
            >
                <MacWindowFrame className="mx-auto hidden w-full sm:block lg:max-w-[83vw]">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        src="/videos/LandingHowItWorks.mp4"
                        className="
                            block
                            aspect-video
                            w-full
                            object-cover
                        "
                    />
                </MacWindowFrame>

                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    src="/videos/LandingHowItWorks.mp4"
                    className="
                        block
                        aspect-video
                        w-full
                        rounded-lg
                        object-cover
                        sm:hidden
                    "
                />
            </div>
        </section>
    );
};

export default LandingHowItWorksSection;