"use client";

import { useEffect, useRef } from "react";
import {
    motion,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "motion/react";

import { googleSans, googleSansFlex } from "@/assets/fonts/font.google";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import LandingHeroNavbar from "./Navbar/LandingHeroNavbar";
import ScrollRevealText from "@/animations/ScrollRevealText";
import TextSwapButton from "@/components/shared/animation/TextSwapButton";

type LandingHeroSectionProps = {
    scrollContainerRef: React.RefObject<HTMLElement | null>;
};

const LandingHeroSection = ({
    scrollContainerRef,
}: LandingHeroSectionProps) => {
    const reducedMotion = useReducedMotion();
    const heroRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        container: scrollContainerRef,
        target: heroRef,
        offset: ["start start", "end start"],
    });

    const taglineWords = [
        "Built",
        "Fast.",
        "Built",
        "Secure.",
        "Built",
        "to",
        "Scale.",
    ];

    const subTitleWords = [
        "We empower enterprises to build amazing products and",
        "capture true business value with language AI",
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

        const handlePointerMove = (event: PointerEvent) => {
            pointerX.set(event.clientX - window.innerWidth / 2);
            pointerY.set(event.clientY - window.innerHeight / 2);
        };

        window.addEventListener("pointermove", handlePointerMove, {
            passive: true,
        });

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
        };
    }, [pointerX, pointerY, reducedMotion]);

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
        ["100dvh", "53dvh"]
    );

    const backgroundTop = useTransform(
        scrollYProgress,
        [0, 0.28],
        ["0dvh", "15dvh"]
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
        [0.48, 0.58],
        [0, 1]
    );

    const smoothButtonProgress = useSpring(buttonProgress, {
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
            className="
                relative
                min-h-[250svh]
                w-full
                shrink-0
                bg-[#161617]
            "
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
                        will-change-[width,height,top,border-radius]
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
                            flex
                            items-center
                            justify-between
                            px-6
                            pb-[4vh]
                            sm:px-4
                            md:px-6
                            lg:px-8
                            xl:px-10
                        "
                    >
                        <div className="flex w-200 flex-col gap-2">
                            <ScrollRevealText
                                progress={taglineProgress}
                                reducedMotion={reducedMotion}
                                words={taglineWords}
                                className="text-xl font-bold text-[#9070DF]"
                            />

                            <h1
                                id="hero-heading"
                                className={`
                                    ${googleSans.className}
                                    m-0
                                    w-full
                                    font-bold
                                    text-[52px]
                                    leading-[1.1]
                                    tracking-[-0.055em]
                                    text-white
                                    sm:text-[64px]
                                    md:text-[78px]
                                    lg:text-[60px]
                                `}
                            >
                                We’re building the future of
                                developer connections.
                            </h1>
                        </div>

                        <div className="flex flex-col gap-5">
                            <p
                                className={`
                                    ${googleSansFlex.className}
                                    w-full
                                    max-w-130
                                    text-xl
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
                                    w-60
                                    will-change-[transform,opacity]
                                "
                                style={{
                                    opacity: reducedMotion
                                        ? 1
                                        : buttonOpacity,
                                    scale: reducedMotion
                                        ? 1
                                        : buttonScale,
                                    x: reducedMotion
                                        ? 0
                                        : buttonX,
                                    y: reducedMotion
                                        ? 0
                                        : buttonY,
                                }}
                            >
                                <TextSwapButton text="Try It Now" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingHeroSection;