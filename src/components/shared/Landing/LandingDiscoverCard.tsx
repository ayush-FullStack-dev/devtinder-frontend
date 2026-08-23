"use client";

import {
    motion,
    useAnimationControls,
    useMotionValue,
    useMotionValueEvent,
} from "motion/react";
import { Heart, X } from "lucide-react";
import { useRef, useState } from "react";
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
    const cardRef = useRef<HTMLDivElement>(null);

    const getSwipeThreshold = () => {
        const width = cardRef.current?.offsetWidth ?? 300;

        return {
            left: width * 0.4,
            right: width * 0.4,
        };
    };

    const controls = useAnimationControls();
    const x = useMotionValue(0);

    const [profiles, setProfiles] =
        useState<DeveloperProfile[]>(developers);

    const [swipe, setSwipe] =
        useState<null | "right" | "left">(null);

    const [isAnimating, setIsAnimating] = useState(false);

    const activeProfile = profiles[0];
    const backProfile = profiles[1];
    useMotionValueEvent(x, "change", (latest) => {
        if (isAnimating) return;


        const threshold = getSwipeThreshold();

        if (latest > threshold.right) {
            setSwipe("right");
        } else if (latest < -threshold.left) {
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

            return [...prev.slice(1), prev[0]];
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

        x.set(0);
        setSwipe(null);
    };

    const swipeCard = async (
        direction: "left" | "right"
    ) => {
        if (isAnimating || profiles.length <= 1) {
            return;
        }

        setIsAnimating(true);
        setSwipe(direction);

        const targetX =
            direction === "right" ? 650 : -650;

        const rotate =
            direction === "right" ? 10 : -10;

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

        requestAnimationFrame(() => {
            setIsAnimating(false);
        });
    };

    const handleDragEnd = async () => {
        if (isAnimating) return;

        const currentX = x.get();
        const threshold = getSwipeThreshold();

        if (currentX > threshold.right) {
            await swipeCard("right");
            return;
        }

        if (currentX < -threshold.left) {
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
        `,
                className
            )}
        >
            <div
                ref={cardRef}
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
                    drag={isAnimating ? false : "x"}
                    dragConstraints={{
                        left: -200,
                        right: 300,
                    }}
                    dragElastic={0.45}
                    style={{
                        x,
                        touchAction: "pan-y",
                    }}
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
                        swipeVal={{ swipeSide: swipe }}
                    />
                </motion.div>

                <div
                    className={`                        pointer-events-none
                        absolute
                        inset-x-8
                        -bottom-9
                        z-30
                        flex
                        items-end
                        justify-between `}

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
                                swipe === "left"
                                    ? 1.09
                                    : 1,
                        }}
                        onClick={() => swipeCard("left")}
                        disabled={profiles.length <= 1}
                        className={`  pointer-events-auto
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
                            disabled:opacity-60 ${swipe === "left" ? "bg-black dark:bg-white" : ""}`}
                    >
                        <X
                            size={30}
                            strokeWidth={
                                swipe === "left" ? 4 : 3
                            }
                            className={swipe === "left" ? "text-white dark:text-black" : ""}
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
                                 swipe === "right"
                                    ? 1.09
                                    : 1,
                        }}
                        onClick={() => swipeCard("right")}
                        disabled={profiles.length <= 1}
                        className={`    pointer-events-auto
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
                            disabled:opacity-60 ${swipe === "right" ? "bg-[#EC180E]" : ""}`}
                    >
                        <Heart
                            size={30}
                            strokeWidth={
                                swipe === "right" ? 3 : 2
                            }
                            color={
                                swipe === "right"
                                    ? "#FFFFFF"
                                    : "#CD130A"
                            }
                            fill={
                                swipe === "right"
                                    ? "#FFFFFF"
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