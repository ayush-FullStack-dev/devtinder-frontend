"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
    motion,
    useMotionValue,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
} from "motion/react";

import { googleSans, googleSansFlex } from "@/assets/fonts/font.google";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import LandingHeroNavbar from "./Navbar/LandingHeroNavbar";
import ScrollRevealText from "@/animations/ScrollRevealText";
import TextSwapButton from "@/components/shared/animation/TextSwapButton";
import { useRouter } from "next/navigation";

const ease = [0.22, 1, 0.36, 1] as const;

const LandingHeroSection = () => {
    const scrollContainerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        scrollContainerRef.current = document.getElementById("main-scroll");
    }, []);

    const router = useRouter();
    const reducedMotion = useReducedMotion();
    const heroRef = useRef<HTMLElement>(null);

    const [isDesktop, setIsDesktop] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);

    const { scrollYProgress } = useScroll({
        container: scrollContainerRef,
        target: heroRef,
        offset: ["start start", "end start"],
    });

    const taglineWords = [
        "Meet",
        "Build.",
        "Share",
        "Ideas.",
        "Find",
        "Your",
        "Dev.",
    ];

    const subTitleWords = [
        "Meet developers who think like you, build like you, and",
        "turn ambitious ideas into something real",
    ];

    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);

    const smoothPointerX = useSpring(pointerX, {
        stiffness: 70,
        damping: 26,
        mass: 0.6,
    });
    
    const smoothPointerY = useSpring(pointerY, {
        stiffness: 70,
        damping: 26,
        mass: 0.6,
    });

    useEffect(() => {
        if (reducedMotion) return;

        let frame = 0;
        let nextX = 0;
        let nextY = 0;

        const handlePointerMove = (event: PointerEvent) => {
            nextX =
                event.clientX -
                window.innerWidth / 2;

            nextY =
                event.clientY -
                window.innerHeight / 2;

            if (frame) return;

            frame = requestAnimationFrame(() => {
                pointerX.set(nextX);
                pointerY.set(nextY);
                frame = 0;
            });
        };

        window.addEventListener(
            "pointermove",
            handlePointerMove,
            { passive: true }
        );

        return () => {
            window.removeEventListener(
                "pointermove",
                handlePointerMove
            );

            if (frame) {
                cancelAnimationFrame(frame);
            }
        };
    }, [
        pointerX,
        pointerY,
        reducedMotion,
    ]);

    useEffect(() => {
        const media = window.matchMedia(
            "(min-width: 1024px)"
        );

        const update = () => {
            setIsDesktop(media.matches);
        };

        update();

        media.addEventListener(
            "change",
            update
        );

        return () => {
            media.removeEventListener(
                "change",
                update
            );
        };
    }, []);

    useMotionValueEvent(
        scrollYProgress,
        "change",
        (latest) => {
            if (isDesktop) return;

            const visible =
                latest > 0.20;

            setContentVisible(
                (previous) =>
                    previous === visible
                        ? previous
                        : visible
            );
        }
    );

    const backgroundX = useTransform(
        smoothPointerX,
        (value) => value * 0.0025
    );

    const backgroundY = useTransform(
        smoothPointerY,
        (value) => value * 0.0025
    );

    const backgroundWidth = useTransform(
        scrollYProgress,
        [0, 0.20],
        ["100%", "95%"]
    );

    const backgroundHeight = useTransform(
        scrollYProgress,
        [0, 0.28],
        [
            "100dvh",
            isDesktop
                ? "53dvh"
                : "50dvh",
        ]
    );

    const backgroundTop = useTransform(
        scrollYProgress,
        [0, 0.28],
        [
            "0dvh",
            isDesktop
                ? "14dvh"
                : "10dvh",
        ]
    );

    const backgroundRadius = useTransform(
        scrollYProgress,
        [0, 0.28],
        ["0px", "32px"]
    );

    const taglineProgress = useTransform(
        scrollYProgress,
        [0.29, 0.37],
        [0, 1]
    );

    const subTitleProgress = useTransform(
        scrollYProgress,
        [0.37, 0.50],
        [0, 1]
    );

    const buttonProgress = useTransform(
        scrollYProgress,
        [0.47, 0.58],
        [0, 1]
    );

    const smoothButtonProgress =
        useSpring(buttonProgress, {
            stiffness: 110,
            damping: 20,
            mass: 0.45,
        });

    const buttonOpacity = useTransform(
        smoothButtonProgress,
        [0, 0.15, 0.75],
        [0, 0.20, 1]
    );

    const buttonScale = useTransform(
        smoothButtonProgress,
        [0, 1],
        [1.12, 1]
    );

    const buttonX = useTransform(
        smoothButtonProgress,
        [0, 1],
        [20, 0]
    );

    const buttonY = useTransform(
        smoothButtonProgress,
        [0, 1],
        [28, 0]
    );

    return (
        <section
            ref={heroRef}
            className={`relative ${reducedMotion
                ? "min-h-dvh"
                : "min-h-[250svh]"
                } w-full shrink-0 bg-[#161617]`}
        >
            <div className="sticky top-0 h-dvh w-full overflow-hidden">
                <div className="relative z-50">
                    <LandingHeroNavbar />
                </div>

                <motion.div
                    className="
                        absolute
                        left-1/2
                        top-0
                        z-0
                        -translate-x-1/2
                        overflow-hidden
                        bg-[#050505]
                        transform-gpu
                       will-change-[width,height,top,border-radius,transform]
                      backface-hidden
                    "
                    style={{
                        width: reducedMotion
                            ? "95%"
                            : backgroundWidth,
                        height: reducedMotion
                            ? "55dvh"
                            : backgroundHeight,
                        top: reducedMotion
                            ? isDesktop
                                ? "14dvh"
                                : "10dvh"
                            : backgroundTop,
                        borderRadius: reducedMotion
                            ? "32px"
                            : backgroundRadius,
                        x: reducedMotion
                            ? 0
                            : backgroundX,
                        y: reducedMotion
                            ? 0
                            : backgroundY,
                    }}
                >
                    <div className="absolute inset-0 overflow-hidden bg-[#050505]">
                        <div
                            className="
            absolute
            left-1/2
            top-1/2
            h-dvh
            w-screen
            -translate-x-1/2
            -translate-y-1/2
        "
                        >
                            <Image
                                src="/images/landing-intro-poster.webp"
                                alt=""
                                aria-hidden="true"
                                fill
                                priority
                                sizes="100vw"
                                className="
                absolute
                inset-0
                object-cover
            "
                            />

                            <video
                                className="
                absolute
                inset-0
                size-full
                object-cover
                duration-500
                ease-out
                z-5
            "
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="metadata"

                           
                            >
                                <source
                                    src="/videos/LandingIntro.mp4"
                                    type="video/mp4"
                                />
                            </video>
                        </div>
                    </div>
                </motion.div>

                <div className="pointer-events-none absolute inset-0 z-20">
                    <div
                        className="
                            absolute
                            inset-x-0
                            bottom-0
                            h-full
                            flex
                            flex-col
                            justify-end
                            lg:flex-row
                            items-center
                            sm:items-start
                            lg:items-end
                            lg:justify-between
                            px-2
                            sm:px-4
                            pb-4
                            sm:pb-3
                            md:px-5
                            lg:px-6
                            xl:px-8
                            lg:pb-10
                            lg:gap-0
                            gap-4
                        "
                    >
                        <div className="flex flex-col gap-2 md:gap-3">
                            <motion.div
                                initial={false}
                                animate={{
                                    height:
                                        isDesktop ||
                                            contentVisible ||
                                            reducedMotion
                                            ? "auto"
                                            : "0px",
                                }}
                                transition={{
                                    height: {
                                        duration: 0.6,
                                        ease,
                                    },
                                }}
                            >
                                <ScrollRevealText
                                    progress={
                                        taglineProgress
                                    }
                                    reducedMotion={
                                        reducedMotion
                                    }
                                    words={
                                        taglineWords
                                    }
                                    className="
                                        text-[3.5vw]
                                        xs:text-mid
                                        lg:text-lg
                                        3xl:text-xl
                                        5xl:text-2xl
                                        7xl:text-3xl
                                        uppercase
                                        -mb-1
                                        font-bold
                                        text-[#9070DF]
                                    "
                                />
                            </motion.div>

                            <h1
                                id="hero-heading"
                                className={`
        ${googleSans.className}
        m-0
        w-[95vw]
        font-bold
        leading-[1.05]
        tracking-[-0.06em]
        text-white
        text-[8.4vw]
        xs:text-[2.5rem]
        sm:text-[6.3vw]
        md:w-[72vw]
        md:text-[2.8rem]
        xl:text-[3.5rem]
        lg:w-[52vw]
        2xl:w-[47vw]
        3xl:text-[4rem]
        3xl:w-[42vw]
    `}
                            >
                                We’re building the future of developer connections.
                            </h1>
                        </div>

                        <motion.div
                            initial={false}
                            animate={{
                                height:
                                    isDesktop ||
                                        contentVisible
                                        ? "auto"
                                        : "0px",
                            }}
                            transition={{
                                height: {
                                    duration: 0.6,
                                    ease,
                                },
                            }}
                            className="flex flex-col gap-4 lg:gap-5"
                        >
                            <p
                                className={`
        ${googleSansFlex.className}
        w-full
        max-w-130
        text-base
        xs:text-lg
        sm:text-xl
        md:text-xl
        lg:text-lg
        xl:text-lg
        2xl:text-xl
        3xl:text-[1.55rem]
        4xl:text-[1.65rem]
        5xl:text-[1.8rem]
        6xl:text-[1.95rem]
        7xl:text-[2.1rem]
        8xl:text-[2.25rem]
        9xl:text-[2.4rem]
        10xl:text-[2.55rem]
        font-heading
        text-[#939393]
    `}
                            >
                                <ScrollRevealText
                                    progress={subTitleProgress}
                                    reducedMotion={reducedMotion}
                                    words={subTitleWords}
                                    groupSize={1}
                                    className="flex flex-col"
                                    extraAnimation={false}
                                />
                            </p>

                            <motion.div
                                className="
                                    pointer-events-auto
                                    transform-gpu
                                    h-12
                                    w-[90vw]
                                    lg:h-13
                                    lg:w-70
                                    will-change-[transform,opacity]
                                "
                                style={{
                                    opacity:
                                        reducedMotion
                                            ? 1
                                            : buttonOpacity,
                                    scale:
                                        reducedMotion
                                            ? 1
                                            : buttonScale,
                                    x:
                                        reducedMotion
                                            ? 0
                                            : buttonX,
                                    y:
                                        reducedMotion
                                            ? 0
                                            : buttonY,
                                }}
                            >
                                <TextSwapButton
                                className="text-white"
                                    text="Try It Now"
                                    onClick={() =>
                                        router.push(
                                            "/auth/signup"
                                        )
                                    }
                                    animateAllowed={
                                        isDesktop &&
                                        !reducedMotion
                                    }
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default LandingHeroSection;