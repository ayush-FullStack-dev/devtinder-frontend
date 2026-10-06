"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
    googleSans,
    googleSansFlex,
} from "@/assets/fonts/font.google";
import { LandingHowItWorks_VIDEO_NOSOUND_MP4, LandingHowItWorks_VIDEO_NOSOUND_WEBM } from "@/constants/landing";

const LandingHowItWorksSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const scrollContainerRef = useRef<HTMLElement | null>(null);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        scrollContainerRef.current = document.getElementById("main-scroll");

        const mediaQuery = window.matchMedia("(min-width: 1024px)");

        const updateMedia = () => {
            setIsDesktop(mediaQuery.matches);
        };

        updateMedia();
        mediaQuery.addEventListener("change", updateMedia);

        return () => {
            mediaQuery.removeEventListener("change", updateMedia);
        };
    }, []);

    const { scrollYProgress } = useScroll({
        container: scrollContainerRef,
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const rawTextY = useTransform(
        scrollYProgress,
        [0, 0.6],
        [0, -20]
    );

    const rawTextOpacity = useTransform(
        scrollYProgress,
        [0, 0.65],
        [1, 0]
    );

    const rawTextScale = useTransform(
        scrollYProgress,
        [0, 0.4],
        [1, 0.65]
    );

    return (
        <section
            ref={sectionRef}
            aria-labelledby="how-it-works-title"
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
                                opacity: rawTextOpacity,
                                y: rawTextY,
                                scale: rawTextScale,
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
                            duration: 0.9,
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
                                text-sm
                                text-green-brand
                                xs:text-base
                                sm:text-lg
                                xl:text-lg
                                3xl:text-xl
                                4xl:text-2xl
                                5xl:text-3xl
                                7xl:text-4xl
                                8xl:text-5xl
                                9xl:text-6xl
                            `}
                        >
                            HOW IT WORKS
                        </motion.h2>

                        <h1
                            id="how-it-works-title"
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
                                text-fixed-white
                                leading-[0.95]
                                tracking-tight
                                xs:text-[12vw]
                                sm:text-[12vw]
                                md:text-[11vw]
                                lg:text-[8vw]
                            `}
                        >
                            <motion.span
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
                            </motion.span>

                            <motion.span
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
                            </motion.span>
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
                <div
                    className="
                        relative
                        mx-auto
                        block
                        aspect-video
                        w-full
                        shrink-0
                        overflow-hidden
                        sm:rounded-lg
                        lg:w-[90vw]
                        lg:max-w-none
                    "
                >
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        poster="/images/posters/landing-how-it-works-poster.webp"
                        aria-label="How DevTinder works"
                        className="absolute inset-0 h-full w-full object-cover"
                    >
                        <source
                            src={LandingHowItWorks_VIDEO_NOSOUND_WEBM}
                            type="video/webm"
                        />
                        <source
                            src={LandingHowItWorks_VIDEO_NOSOUND_MP4}
                            type="video/mp4"
                        />
                    </video>

                    <p className="sr-only">
                        Learn how DevTinder works, from connecting with
                        developers to collaborating and creating projects
                        together.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default LandingHowItWorksSection;