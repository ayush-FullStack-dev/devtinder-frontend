"use client";

import {
    motion,
    useAnimationControls,
    useMotionValue,
    useMotionValueEvent,
} from "motion/react";
import { Ban, CircleX, Heart, X } from "lucide-react";
import { useState } from "react";
import LandingDeveloperCard from "./LandingDeveloperCard";
import { twMerge } from "tailwind-merge";

export interface DeveloperProfile {
    id: string;
    name: string;
    age: number | string;
    verified?: boolean;
    role: string;
    location: string;
    images: string[];
    isOnline: boolean;
    techStack: string[];
    duration?: number;
}

interface LandingDiscoverCardProps {
    developers: DeveloperProfile[];
    className?: string;
}

const LandingDiscoverCard = ({
    developers,
    className,
}: LandingDiscoverCardProps) => {
    const cardRemoveVal = {
        left: 300,
        right: 250,
    };

    const controls = useAnimationControls();
    const x = useMotionValue(0);

    const [profiles, setProfiles] =
        useState<DeveloperProfile[]>(developers);

    const [swipe, setSwipe] =
        useState<null | "right" | "left">(null);

    const [activeSwipe, setActiveSwipe] =
        useState<null | "right" | "left">(null);

    const [isAnimating, setIsAnimating] =
        useState(false);

    const activeProfile = profiles[0];
    const backProfile = profiles[1];

    useMotionValueEvent(x, "change", (latest) => {
        if (isAnimating) return;

        if (latest > 50) {
            setActiveSwipe("right");
        } else if (latest < -50) {
            setActiveSwipe("left");
        } else {
            setActiveSwipe(null);
        }

        if (latest > cardRemoveVal.right) {
            setSwipe("right");
        } else if (latest < -cardRemoveVal.left) {
            setSwipe("left");
        } else {
            setSwipe(null);
        }
    });

    const moveCardToEnd = () => {
        setProfiles((prev) => {
            if (prev.length <= 1) {
                return prev;
            }

            return [
                ...prev.slice(1),
                prev[0],
            ];
        });
    };

    const resetCard = async () => {
        await controls.start({
            x: 0,
            y: 0,
            opacity: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 280,
                damping: 28,
                mass: 0.8,
            },
        });

        setSwipe(null);
        setActiveSwipe(null);
        x.set(0);
    };

    const swipeCard = async (
        direction: "left" | "right"
    ) => {
        if (
            isAnimating ||
            profiles.length <= 1
        ) {
            return;
        }

        setIsAnimating(true);
        setActiveSwipe(direction);
        setSwipe(direction);

        const targetX =
            direction === "right"
                ? 650
                : -650;

        const rotate =
            direction === "right"
                ? 10
                : -10;

        await controls.start({
            x: targetX,
            y: 0,
            opacity: 0,
            rotate,
            transition: {
                type: "spring",
                stiffness: 240,
                damping: 25,
                mass: 0.8,
            },
        });

        moveCardToEnd();

        controls.set({
            x: 0,
            y: 0,
            opacity: 1,
            rotate: 0,
        });

        x.set(0);
        setSwipe(null);
        setActiveSwipe(null);

        requestAnimationFrame(() => {
            setIsAnimating(false);
        });
    };

    const handleDragEnd = async () => {
        if (isAnimating) return;

        const currentX = x.get();

        if (currentX > cardRemoveVal.right) {
            await swipeCard("right");
            return;
        }

        if (currentX < -cardRemoveVal.left) {
            await swipeCard("left");
            return;
        }

        await resetCard();
    };

    if (!activeProfile) {
        return null;
    }

    return (
        <div
            className={twMerge(
                `
            relative
            h-full
            w-full
            shrink-0
            lg:w-[clamp(280px,30vw,400px)]
            lg:max-w-none
        `,
                className
            )}
        >
            <div
                className="
                    relative
                    h-full
                    w-full
                "
            >
                {backProfile && (
                    <motion.div
                        key={backProfile.id}
                        layout
                        layoutId={`developer-card-${backProfile.id}`}
                        transition={{
                            layout: {
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            },
                        }}
                        className="
                            absolute
                            inset-0
                            z-0
                            h-full
                            w-full
                            scale-[0.95]
                            translate-y-3
                        "
                    >
                        <LandingDeveloperCard
                            name={backProfile.name}
                            age={backProfile.age}
                            verified={backProfile.verified}
                            role={backProfile.role}
                            location={backProfile.location}
                            images={backProfile.images}
                            isOnline={backProfile.isOnline}
                            techStack={backProfile.techStack}
                            duration={backProfile.duration}
                            autoPlay={false}
                        />
                    </motion.div>
                )}

                <motion.div
                    key={activeProfile.id}
                    layout
                    layoutId={`developer-card-${activeProfile.id}`}
                    className="
                        relative
                        z-10
                        h-full
                        w-full
                    "
                    drag={!isAnimating}
                    dragConstraints={{
                        left: -200,
                        right: 300,
                        top: -100,
                        bottom: 0,
                    }}
                    dragElastic={0.45}
                    style={{ x }}
                    animate={controls}
                    onDragEnd={handleDragEnd}
                    transition={{
                        layout: {
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                        },
                    }}
                >
                    <LandingDeveloperCard
                        name={activeProfile.name}
                        age={activeProfile.age}
                        verified={activeProfile.verified}
                        role={activeProfile.role}
                        location={activeProfile.location}
                        images={activeProfile.images}
                        isOnline={activeProfile.isOnline}
                        techStack={activeProfile.techStack}
                        duration={activeProfile.duration}
                        autoPlay={true}
                    />
                </motion.div>

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-x-4
                        -bottom-9
                        z-30
                        flex
                        items-end
                        justify-between
                    "
                >
                    <motion.button
                        type="button"
                        whileHover={{
                            scale: 1.09,
                        }}
                        whileTap={{
                            scale: 0.92,
                        }}
                        animate={{
                            scale:
                                activeSwipe === "left"
                                    ? 1.09
                                    : 1,
                        }}
                        onClick={() =>
                            swipeCard("left")
                        }
                        disabled={
                            isAnimating ||
                            profiles.length <= 1
                        }
                        className="
                            pointer-events-auto
                            flex
                            size-11
                            items-center
                            justify-center
                            rounded-full
                            bg-[#24262A]/95
                            text-white
                            shadow-lg
                            backdrop-blur-sm
                            sm:size-14
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >
                        <X
                            size={27}
                            strokeWidth={swipe === "left" ? 3 : 2.5}
                            color={
                                swipe === "left"
                                    ? "red"
                                    : "#FFFFFF"
                            }
                        />
                    </motion.button>

                    <motion.button
                        type="button"
                        whileHover={{
                            scale: 1.08,
                        }}
                        whileTap={{
                            scale: 0.92,
                        }}
                        animate={{
                            scale:
                                activeSwipe === "right"
                                    ? 1.09
                                    : 1,
                        }}
                        onClick={() =>
                            swipeCard("right")
                        }
                        disabled={
                            isAnimating ||
                            profiles.length <= 1
                        }
                        className="
                            pointer-events-auto
                            flex
                            size-11
                            items-center
                            justify-center
                            rounded-full
                            bg-[#24262A]/95
                            text-white
                            shadow-lg
                            backdrop-blur-sm
                            sm:size-14
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >
                        <Heart
                            size={25}
                            color={
                                swipe === "right"
                                    ? "#EF4444"
                                    : "#FFFFFF"
                            }
                            fill={
                                swipe === "right"
                                    ? "#EF4444"
                                    : "none"
                            }
                        />
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default LandingDiscoverCard;