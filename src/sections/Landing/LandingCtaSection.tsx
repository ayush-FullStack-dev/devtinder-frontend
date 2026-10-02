"use client";

import Image from "next/image";
import {
    motion,
    useScroll,
    type MotionStyle,
} from "motion/react";
import { useEffect, useRef } from "react";

import { googleSans } from "@/assets/fonts/font.google";
import {
    useHandMotion,
    type HandMotionOptions,
} from "@/hooks/useHandMotion";
import { PillButton } from "@/components/shared/PillButton";
import Link from "next/link";
import FeatureItem from "@/components/shared/FeatureItem";
import { ChartNoAxesColumnIncreasing, Users } from "lucide-react";
import { FaUserGroup } from "react-icons/fa6";
import { features } from "@/constants/landing";

const HAND_FLOAT = {
    human: {
        y: [-5, 5, -2.5, 0],
        rotate: [-0.5, 0.6, -0.25, 0],
        duration: 4,
    },
    robot: {
        y: [-4, 4, -2, 0],
        rotate: [0.4, -0.5, 0.2, 0],
        duration: 4.4,
    },
};

const HAND_MOTION: Record<
    "human" | "robot",
    HandMotionOptions
> = {
    human: {
        x: ["-50vw", "-0.1vw"],
        y: [150, 0],
        rotate: ["-50deg", "0deg"],
    },
    robot: {
        x: ["50vw", "0.1vw"],
        y: [-50, 0],
        rotate: ["50deg", "0deg"],
    },
};

const fadeUp = (
    y: number,
    duration: number,
    delay: number,
) => ({
    initial: {
        opacity: 0,
        y,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
    },
});

export const LandingCtaSection = () => {
    const scrollContainerRef = useRef<HTMLElement | null>(null);
    const ctaRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        scrollContainerRef.current =
            document.getElementById("main-scroll");
    }, []);

    const { scrollYProgress } = useScroll({
        container: scrollContainerRef,
        target: ctaRef,
        offset: ["start start", "end start"],
    });

    const humanHand = useHandMotion(
        scrollYProgress,
        HAND_MOTION.human,
    );

    const robotHand = useHandMotion(
        scrollYProgress,
        HAND_MOTION.robot,
    );

    return (
        <section
            ref={ctaRef}
            className="relative h-svh  md:h-[220svh] w-full shrink-0"
        >
            <div className="sticky top-0 h-svh w-full overflow-hidden">
                <CtaContent />


                <Hands
                    humanHand={humanHand}
                    robotHand={robotHand}
                />
            </div>
        </section>
    );
};


const CtaContent = () => {
    return (
        <div
            className="
                absolute
                inset-0
                z-10
                flex
                gap-5
                flex-col
                items-center
                justify-center
            "
        >
            <div
                className={`
                    ${googleSans.className}
                    flex
                    w-full
                    items-center
                    justify-center
                    text-center
                    relative
                    bottom-auto
                    md:w-[60vw]
                    xs:w-[60vw]
                `}
            >
                <motion.div {...fadeUp(24, 1, 0.05)}>
                    <p
                        className="
                            textured-text
                            text-sm
                            font-medium
                            tracking-widest
                            mb-5
                        "
                    >
                        READY TO BUILD TOGETHER?
                    </p>

                    <motion.div
                        {...fadeUp(28, 1.05, 0.14)}
                        className="relative mb-5"
                    >
                        <h1
                            className="
                                text-[18vw]
                                font-bold
                                capitalize
                                leading-[0.92]
                                xs:text-[15vw]
                                sm:text-[12vw]
                                 md:text-[10vw]
                                 lg:text-[8vw]
                                xl:text-[7vw]
                                md:leading-none
                            "
                        >
                            <span className="block">
                                Let's
                            </span>

                            <span className="textured-text block">
                                connect
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        {...fadeUp(22, 0.95, 0.28)}
                        className="
        flex
        w-[90%]
        lg:w-[70%]
        mx-auto
        text-sm
        font-bold
        capitalize
        tracking-widest
        text-[#8d8d8f]
        text-center
    "
                    >
                        Join DevTinder and find developers who share your vision.
                    </motion.p>
                </motion.div>
            </div>
            <div
                className="
                    relative
                    z-30
                 
                "
            >
                <Link href="/auth/signup">
                    <PillButton className={`bg-[#161D26]  h-13 font-bold w-[80vw] xs:w-[70vw] sm:w-90 md:w-80 text-white ${googleSans.className}`}>
                        Get Started
                    </PillButton>
                </Link>
            </div>

            <div className="absolute bottom-5 hidden sm:flex w-full items-center justify-evenly px-3 sm:px-5">
                {features.map((feature) => (
                    <FeatureItem
                        key={feature.title}
                        icon={feature.icon}
                        iconColor="black"
                        title={feature.title}
                        description={feature.description}
                        iconWrapperClassName="
        aspect-square
        w-13
        rounded-full
        md:overflow-hidden
        md:bg-[#F0F1F3]
        p-1.5
        sm:w-9
        sm:p-2
        md:w-14
        md:p-2
        lg:w-13
        lg:p-3
      "
                    />
                ))}
            </div>
        </div>
    );
};

type HandsProps = {
    humanHand: MotionStyle;
    robotHand: MotionStyle;
};

const Hands = ({
    humanHand,
    robotHand,
}: HandsProps) => {
    return (
        <div
            className="
                pointer-events-none
                absolute
                inset-0
                z-20
                hidden
                md:flex
                select-none
            "
        >
            <Hand
                motionStyle={humanHand}
                image="/images/human-hand.webp"
                alt="Human hand"
                objectPosition="
                    object-[50%_40%]
                    xs:object-[50%_40%]
                    sm:object-[50%_40%]
                    lg:object-[50%_42%]
                    xl:object-[50%_40%]
                "
                float={HAND_FLOAT.human}
            />

            <Hand
                motionStyle={robotHand}
                image="/images/robot-hand.webp"
                alt="Robot hand"
                objectPosition="
                    object-[50%_45%]
                    sm:object-[50%_50%]
                    lg:object-[50%_60%]
                "
                float={HAND_FLOAT.robot}
            />
        </div>
    );
};

type HandProps = {
    motionStyle: MotionStyle;
    image: string;
    alt: string;
    objectPosition: string;
    float: {
        y: number[];
        rotate: number[];
        duration: number;
    };
};

const Hand = ({
    motionStyle,
    image,
    alt,
    objectPosition,
    float,
}: HandProps) => {
    return (
        <motion.div
            style={motionStyle}
            className="relative h-full w-1/2"
        >
            <motion.div
                animate={{
                    y: float.y,
                    rotate: float.rotate,
                }}
                transition={{
                    duration: float.duration,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                }}
                className="absolute inset-0"
            >
                <Image
                    src={image}
                    alt={alt}
                    width={700}
                    height={700}
                    priority
                    draggable={false}
                    className={`
                        absolute
                        h-full
                        w-full
                        object-contain
                        ${objectPosition}
                    `}
                />
            </motion.div>
        </motion.div>
    );
};