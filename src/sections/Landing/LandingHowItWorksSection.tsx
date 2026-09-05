"use client";

import { useEffect, useRef, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
} from "motion/react";

import {
    googleSans,
    googleSansFlex,
} from "@/assets/fonts/font.google";

import MacWindowFrame from "@/components/shared/frames/MacWindowFrame";

const LandingHowItWorksSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);
    const [container, setContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setContainer(
            document.getElementById("main-scroll")
        );

        const mediaQuery = window.matchMedia(
            "(min-width: 1024px)"
        );

        const updateMedia = () => {
            setIsDesktop(mediaQuery.matches);
        };

        updateMedia();

        mediaQuery.addEventListener(
            "change",
            updateMedia
        );

        return () => {
            mediaQuery.removeEventListener(
                "change",
                updateMedia
            );
        };
    }, []);

    const { scrollYProgress } = useScroll({
        container: container
            ? { current: container }
            : undefined,
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const textY = useTransform(
        scrollYProgress,
        [0, 0.6],
        [0, -20]
    );

    const textOpacity = useTransform(
        scrollYProgress,
        [0, 0.65],
        [1, 0]
    );

    const textScale = useTransform(
        scrollYProgress,
        [0, 0.4],
        [1, 0.65]
    );

    return (
        <section
            ref={sectionRef}
            className="
                relative
                flex
                min-h-dvh
                w-full
                shrink-0
                flex-col
                gap-10
                sm:px-4
                lg:min-h-[170svh]
                lg:block
            "
        >
            <motion.div
                className="
                    relative
                    z-0
                    flex
                    min-h-[55svh]
                    w-full
                    shrink-0
                    items-center
                    justify-center
                    lg:sticky
                    lg:top-0
                    lg:h-dvh
                    lg:min-h-0
                "
            >
                <motion.div
                    style={
                        isDesktop
                            ? {
                                opacity: textOpacity,
                                y: textY,
                                scale: textScale,
                            }
                            : undefined
                    }
                    className="
                        flex
                        w-full
                        shrink-0
                        flex-col
                        items-center
                        lg:will-change-transform
                    "
                >
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.97,
                        }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                        }}
                        viewport={{
                            once: true,
                            amount: 0.15,
                        }}
                        transition={{
                            duration: 0.90,
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
                                xl:text-2xl
                                3xl:text-2xl
                                4xl:text-3xl
                                5xl:text-4xl
                                7xl:text-6xl
                               8xl:text-7xl
                               9xl:text-9xl
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

            <div
                className="
                    relative
                    z-10
                    w-full
                    shrink-0
                    lg:mt-[-8vh]
                "
            >
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
                        preload="metadata"
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
                            opacity-0
                            w-full
                            shrink-0
                        "
                    />
                </MacWindowFrame>

                <div
                    className="
                        relative
                        block
                        h-full
                        min-h-100
                        max-h-[55svh]
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
                        preload="metadata"
                        poster="/brand/social/og-image.png"
                        src="/videos/LandingHowItWorks.mp4"
                        className="
                            absolute
                            inset-0
                            h-full
                            w-full
                            object-fill
                        "
                    />
                </div>
            </div>
        </section>
    );
};

export default LandingHowItWorksSection;