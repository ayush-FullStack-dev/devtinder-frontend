"use client";

import {
    useEffect,
    useRef,
} from "react";

import { googleSans } from "@/assets/fonts/font.google";
import AnimatedButton from "@/components/shared/AnimatedButton";

import Link from "next/link";

import {
    motion,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "motion/react";

import KineticMetalFlow from "@/animations/KineticMetalFlow";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type LandingHeroSectionProps = {
    scrollContainerRef:
    React.RefObject<
        HTMLElement | null
    >;
};

const LandingHeroSection = ({
    scrollContainerRef,
}: LandingHeroSectionProps) => {
    const reduced =
        useReducedMotion();

    const sectionRef =
        useRef<HTMLElement>(null);

    const { scrollYProgress } =
        useScroll({
            container:
                scrollContainerRef,
            target: sectionRef,
            offset: [
                "start start",
                "end start",
            ],
        });

    const rawX =
        useMotionValue(0);

    const rawY =
        useMotionValue(0);

    const smoothX =
        useSpring(rawX, {
            stiffness: 70,
            damping: 26,
            mass: 0.6,
        });

    const smoothY =
        useSpring(rawY, {
            stiffness: 70,
            damping: 26,
            mass: 0.6,
        });

    useEffect(() => {
        if (reduced) return;

        const handlePointer = (
            event: PointerEvent
        ) => {
            rawX.set(
                event.clientX -
                window.innerWidth /
                2
            );

            rawY.set(
                event.clientY -
                window.innerHeight /
                2
            );
        };

        window.addEventListener(
            "pointermove",
            handlePointer,
            {
                passive: true,
            }
        );

        return () => {
            window.removeEventListener(
                "pointermove",
                handlePointer
            );
        };
    }, [
        reduced,
        rawX,
        rawY,
    ]);

    const visualX =
        useTransform(
            smoothX,
            (value) =>
                value * 0.0025
        );

    const visualY =
        useTransform(
            smoothY,
            (value) =>
                value * 0.0025
        );

    const visualWidth =
        useTransform(
            scrollYProgress,
            [0, 0.22, 0.55, 1],
            [
                "100%",
                "99%",
                "92%",
                "85%",
            ]
        );

    const visualHeight =
        useTransform(
            scrollYProgress,
            [0, 0.22, 0.55, 1],
            [
                "100dvh",
                "94dvh",
                "76dvh",
                "58dvh",
            ]
        );

    const visualTop =
        useTransform(
            scrollYProgress,
            [0, 0.22, 0.55, 1],
            [
                "0dvh",
                "1dvh",
                "4dvh",
                "6dvh",
            ]
        );

    const visualRadius =
        useTransform(
            scrollYProgress,
            [0, 0.2, 0.45, 0.7, 1],
            [
                "0px",
                "3px",
                "10px",
                "20px",
                "28px",
            ]
        );

    const contentOpacity =
        useTransform(
            scrollYProgress,
            [0.12, 0.2],
            [0, 1]
        );

    const contentY =
        useTransform(
            scrollYProgress,
            [0.12, 0.2],
            [24, 0]
        );

    const detailsOpacity =
        useTransform(
            scrollYProgress,
            [0.28, 0.4],
            [0, 1]
        );

    const detailsY =
        useTransform(
            scrollYProgress,
            [0.28, 0.4],
            [22, 0]
        );

    const ctaOpacity =
        useTransform(
            scrollYProgress,
            [0.42, 0.53],
            [0, 1]
        );

    const ctaY =
        useTransform(
            scrollYProgress,
            [0.42, 0.53],
            [18, 0]
        );

    const ease = [
        0.22,
        1,
        0.36,
        1,
    ] as const;

    return (
        <section
            ref={sectionRef}
            className="
                relative
                bg-[#161617]
                min-h-[185svh]
                w-full
                shrink-0
            "
        >
            <div
                className="
                    sticky
                    top-0
                    h-dvh
                    w-full
                    overflow-hidden
                "
            >
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
                        width: reduced
                            ? "100%"
                            : visualWidth,

                        height: reduced
                            ? "100dvh"
                            : visualHeight,

                        top: reduced
                            ? 0
                            : visualTop,

                        borderRadius:
                            reduced
                                ? "0px"
                                : visualRadius,

                        x: reduced
                            ? 0
                            : visualX,

                        y: reduced
                            ? 0
                            : visualY,
                    }}
                >
                    <div
                        className="
                            absolute
                            inset-0
                            overflow-hidden
                            bg-[#050505]
                        "
                    >
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
                            <KineticMetalFlow />
                        </div>
                    </div>
                </motion.div>

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        z-20
                    "
                >
                    <div
                        className="
                            absolute
                            inset-x-0
                            bottom-0
                            px-6
                            pb-[7vh]
                            sm:px-8
                            sm:pb-[7vh]
                            md:px-10
                            lg:px-12
                            xl:px-16
                        "
                    >
                        <div
                            className="
                                mx-auto
                                flex
                                w-full
                                max-w-360
                                flex-col
                                gap-10
                                lg:flex-row
                                lg:items-end
                                lg:justify-between
                                lg:gap-16
                            "
                        >
                                <h1
                                    id="hero-heading"
                                    className={`
                                        ${googleSans.className}
                                        m-0
                                        max-w-225
                                        text-[52px]
                                        font-semibold
                                        leading-[0.91]
                                        tracking-[-0.055em]
                                        text-white
                                        sm:text-[64px]
                                        md:text-[78px]
                                        lg:text-[92px]
                                        xl:text-[104px]
                                        2xl:text-[112px]
                                    `}
                                >
                                    We’re building the future of language AI
                                </h1>
                            <motion.div
                                style={{
                                    opacity:
                                        reduced
                                            ? 1
                                            : contentOpacity,

                                    y: reduced
                                        ? 0
                                        : contentY,
                                }}
                                className="
                                    max-w-212
                                "
                            >
                                <div
                                    className={`
                                        ${googleSans.className}
                                        mb-4
                                        text-[12px]
                                        font-semibold
                                        uppercase
                                        leading-none
                                        tracking-[0.03em]
                                        text-green-brand
                                        sm:text-[13px]
                                        md:text-[14px]
                                        lg:text-[15px]
                                    `}
                                >
                                    FAST, SECURE AND SCALABLE
                                </div>
                            </motion.div>

                            <motion.div
                                style={{
                                    opacity:
                                        reduced
                                            ? 1
                                            : detailsOpacity,

                                    y: reduced
                                        ? 0
                                        : detailsY,
                                }}
                                className="
                                    w-full
                                    max-w-107.05
                                    lg:mb-1
                                "
                            >
                                <p
                                    className={`
                                        ${googleSans.className}
                                        m-0
                                        text-[15px]
                                        font-normal
                                        leading-[1.45]
                                        tracking-[-0.01em]
                                        text-white/70
                                        sm:text-[16px]
                                        md:text-mid
                                        lg:text-[18px]
                                    `}
                                >
                                    We empower enterprises
                                    to build amazing products
                                    and capture true business
                                    value.
                                </p>

                                <motion.div
                                    style={{
                                        opacity:
                                            reduced
                                                ? 1
                                                : ctaOpacity,

                                        y: reduced
                                            ? 0
                                            : ctaY,
                                    }}
                                    className="
                                        pointer-events-auto
                                        mt-7
                                    "
                                >
                                    <Link
                                        href="/auth/signup"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            inline-flex
                                            items-center
                                            gap-2
                                        "
                                    >
                                        <AnimatedButton
                                            className="
                                                h-14
                                                min-w-17.5
                                                rounded-full
                                                bg-green-brand
                                                px-8
                                                text-[16px]
                                                font-medium
                                                text-white
                                                sm:h-14.5
                                                sm:min-w-51.25
                                                sm:text-mid
                                            "
                                            text="Try it now"
                                        />

                                        <span
                                            className="
                                                flex
                                                size-14
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-green-brand
                                                text-white
                                                sm:size-14.5
                                            "
                                            aria-hidden="true"
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                className="
                                                    size-5
                                                    sm:size-6
                                                "
                                            >
                                                <path
                                                    d="M5 12H19"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    strokeLinecap="round"
                                                />

                                                <path
                                                    d="M13 6L19 12L13 18"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingHeroSection;