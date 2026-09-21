"use client";

import { useEffect, useRef, useState } from "react";
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

type LandingHeroSectionProps = {
    scrollContainerRef: React.RefObject<HTMLElement | null>;
};

const ease = [0.22, 1, 0.36, 1] as const;

const LandingHeroSection = ({
    scrollContainerRef,
}: LandingHeroSectionProps) => {
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
                <LandingHeroNavbar />

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
                            ? "100%"
                            : backgroundWidth,
                        height: reducedMotion
                            ? "100dvh"
                            : backgroundHeight,
                        top: reducedMotion
                            ? 0
                            : backgroundTop,
                        borderRadius: reducedMotion
                            ? "0px"
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
                            <video
                                className="size-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                                poster="/images/landing-intro-poster.webp"
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
                                    w-[90vw]
                                    xs:w-[90vw]
                                    font-bold
                                    leading-[1.1]
                                    tracking-[-0.055em]
                                    text-white
                                    text-[7.6vw]
                                    xs:text-4xl
                                    sm:text-[5.8vw]
                                    md:w-[70vw]
                                    md:text-4xl
                                    xl:text-5xl
                                    lg:w-[50vw]
                                    2xl:w-[45vw]
                                    3xl:text-6xl
                                    3xl:w-[40vw]
                                `}
                            >
                                We’re building the future of
                                developer connections.
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
                                    text-sm
                                    xs:text-mid
                                    md:text-lg
                                    2xl:text-xl
                                    font-heading
                                    text-[#939393]
                                `}
                            >
                                <ScrollRevealText
                                    progress={
                                        subTitleProgress
                                    }
                                    reducedMotion={
                                        reducedMotion
                                    }
                                    words={
                                        subTitleWords
                                    }
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
        </section>
    );
};

export default LandingHeroSection;