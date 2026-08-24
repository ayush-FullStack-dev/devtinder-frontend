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
import ConnectionOverlay from "../discover/ConnectionOverlay";
import { MIN_SWIPE_THRESHOLD, MAX_DRAG, SWIPE_THRESHOLD_RATIO } from "@/constants/landing";
import { softLoginCheck } from "@/actions/softloginCheck";

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
    isAllowedLike: boolean
}


const LandingDiscoverCard = ({
    developers,
    className,
    isAllowedLike
}: LandingDiscoverCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const animationLockRef = useRef(false);
    const controls = useAnimationControls();
    const x = useMotionValue(0);

    const [profiles, setProfiles] =
        useState<DeveloperProfile[]>(developers);

    const [swipe, setSwipe] =
        useState<null | "right" | "left">(null);

    const [isAnimating, setIsAnimating] =
        useState(false);

    const [showOverlay, setShowOverlay] =
        useState(false);

    const pendingOverlayRef =
        useRef(false);

    const activeProfile = profiles[0];
    const backProfile = profiles[1];

    const getCardWidth = () => {
        return (
            cardRef.current?.getBoundingClientRect()
                .width ?? 300
        );
    };

    const getSwipeThreshold = () => {
        return Math.max(
            getCardWidth() *
            SWIPE_THRESHOLD_RATIO,
            MIN_SWIPE_THRESHOLD
        );
    };

    const getSwipeTarget = (
        direction: "left" | "right"
    ) => {
        const width = getCardWidth();

        const distance = Math.max(
            width * 1.7,
            520
        );

        return direction === "right"
            ? distance
            : -distance;
    };

    useMotionValueEvent(
        x,
        "change",
        (latest) => {
            if (animationLockRef.current) {
                return;
            }

            const threshold =
                getSwipeThreshold();

            if (latest >= threshold) {
                setSwipe("right");
                return;
            }

            if (latest <= -threshold) {
                setSwipe("left");
                return;
            }

            setSwipe(null);
        }
    );

    const showLikeDemo = async () => {
        if (
            animationLockRef.current ||
            isAnimating ||
            showOverlay
        ) {
            return;
        }

        animationLockRef.current = true;
        setIsAnimating(true);
        setSwipe("right");

        controls.stop();

        const width = getCardWidth();

        const likeTarget = Math.max(
            width * 0.95,
            300
        );

        await controls.start({
            x: likeTarget,
            y: 0,
            rotate: 8,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.72,
            },
        });

        await controls.start({
            x: 0,
            y: 0,
            rotate: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 430,
                damping: 35,
                mass: 0.65,
            },
        });

        x.set(0);
        setSwipe(null);

        animationLockRef.current = false;
        setIsAnimating(false);

        setShowOverlay(true);
    };

    const swipeCard = async (
        direction: "left" | "right"
    ) => {
        if (
            animationLockRef.current ||
            isAnimating ||
            profiles.length <= 1
        ) {
            return;
        }

        if (
            direction === "right" &&
            !isAllowedLike
        ) {
            await showLikeDemo();
            return;
        }

        animationLockRef.current = true;
        setIsAnimating(true);
        setSwipe(direction);

        controls.stop();

        const targetX =
            getSwipeTarget(direction);

        const rotate =
            direction === "right"
                ? 8
                : -8;

        await controls.start({
            x: targetX,
            y: 0,
            opacity: 0,
            rotate,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.72,
            },
        });

        const nextProfiles = [
            ...profiles.slice(1),
            profiles[0],
        ];

        setProfiles(nextProfiles);

        controls.set({
            x: 0,
            y: 0,
            opacity: 1,
            rotate: 0,
        });

        x.set(0);
        setSwipe(null);

        const shouldShowOverlay =
            pendingOverlayRef.current;

        pendingOverlayRef.current = false;

        requestAnimationFrame(() => {
            animationLockRef.current =
                false;

            setIsAnimating(false);

            if (shouldShowOverlay) {
                setShowOverlay(true);
            }
        });
    };

    const resetCard = async () => {
        if (animationLockRef.current) {
            return;
        }

        animationLockRef.current = true;
        setIsAnimating(true);

        controls.stop();

        await controls.start({
            x: 0,
            y: 0,
            opacity: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 430,
                damping: 35,
                mass: 0.65,
            },
        });

        x.set(0);
        setSwipe(null);

        animationLockRef.current =
            false;

        setIsAnimating(false);
    };

    const handleLike = () => {
        if (isAllowedLike) {
            void swipeCard("right");
            return;
        }

        void showLikeDemo();
    };

    const handleDragStart = () => {
        if (
            animationLockRef.current ||
            showOverlay
        ) {
            return;
        }

        controls.stop();
    };

    const handleDragEnd = async () => {
        if (
            animationLockRef.current ||
            showOverlay
        ) {
            return;
        }

        const currentX = x.get();

        const threshold =
            getSwipeThreshold();

        if (currentX >= threshold) {
            if (!isAllowedLike) {
                await showLikeDemo();
                return;
            }

            await swipeCard("right");
            return;
        }

        if (currentX <= -threshold) {
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
                    overflow-visible
                    select-none
                `,
                className
            )}
        >
            <ConnectionOverlay
                show={showOverlay}
                onClose={() =>
                    setShowOverlay(false)
                }
            />

            <div
                ref={cardRef}
                className="
                    relative
                    h-full
                    w-full
                    overflow-visible
                "
            >
                {backProfile && (
                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            z-0
                            h-full
                            w-full
                            overflow-hidden
                            rounded-[inherit]
                            translate-y-3
                            scale-[0.95]
                        "
                    >
                        <LandingDeveloperCard
                            key={`back-${backProfile.id}`}
                            name={
                                backProfile.name
                            }
                            age={
                                backProfile.age
                            }
                            verified={
                                backProfile.verified
                            }
                            role={
                                backProfile.role
                            }
                            location={
                                backProfile.location
                            }
                            images={
                                backProfile.images
                            }
                            isOnline={
                                backProfile.isOnline
                            }
                            techStack={
                                backProfile.techStack
                            }
                            duration={
                                backProfile.duration
                            }
                            autoPlay={false}
                        />
                    </div>
                )}

                <motion.div
                    className="
                        relative
                        z-10
                        h-full
                        w-full
                        overflow-hidden
                        rounded-[inherit]
                    "
                    drag={
                        isAnimating ||
                            showOverlay
                            ? false
                            : "x"
                    }
                    dragConstraints={{
                        left: -MAX_DRAG,
                        right: MAX_DRAG,
                    }}
                    dragElastic={0.3}
                    dragMomentum={false}
                    style={{
                        x,
                        touchAction: "pan-y",
                        backfaceVisibility:
                            "hidden",
                        WebkitBackfaceVisibility:
                            "hidden",
                    }}
                    animate={controls}
                    onDragStart={
                        handleDragStart
                    }
                    onDragEnd={
                        handleDragEnd
                    }
                >
                    <LandingDeveloperCard
                        key={
                            activeProfile.id
                        }
                        name={
                            activeProfile.name
                        }
                        age={
                            activeProfile.age
                        }
                        verified={
                            activeProfile.verified
                        }
                        role={
                            activeProfile.role
                        }
                        location={
                            activeProfile.location
                        }
                        images={
                            activeProfile.images
                        }
                        isOnline={
                            activeProfile.isOnline
                        }
                        techStack={
                            activeProfile.techStack
                        }
                        duration={
                            activeProfile.duration
                        }
                        autoPlay={true}
                        swipeVal={{
                            swipeSide: swipe,
                        }}
                    />
                </motion.div>

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-x-8
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
                            scale: 1.07,
                        }}
                        whileTap={{
                            scale: 0.94,
                        }}
                        onClick={() =>
                            swipeCard("left")
                        }
                        disabled={
                            profiles.length <=
                            1
                        }
                        className={`
                            pointer-events-auto
                            flex
                            size-14
                            items-center
                            justify-center
                            rounded-full
                            text-white
                            shadow-lg
                            backdrop-blur-sm
                            transition-none
                            disabled:pointer-events-none
                            disabled:opacity-80
                            ${swipe ===
                                "left"
                                ? "bg-black dark:bg-white"
                                : "bg-[#24262A]/95"
                            }
                        `}
                    >
                        <X
                            size={30}
                            strokeWidth={
                                swipe ===
                                    "left"
                                    ? 4
                                    : 2
                            }
                            className={
                                swipe ===
                                    "left"
                                    ? "text-white dark:text-black"
                                    : "text-white"
                            }
                        />
                    </motion.button>

                    <motion.button
                        type="button"
                        whileHover={{
                            scale: 1.07,
                        }}
                        whileTap={{
                            scale: 0.94,
                        }}
                        onClick={
                            handleLike
                        }
                        disabled={
                            profiles.length <=
                            1
                        }
                        className={`
                            pointer-events-auto
                            flex
                             size-14
                            items-center
                            justify-center
                            rounded-full
                            text-white
                            shadow-lg
                            backdrop-blur-sm
                            transition-none
                            disabled:pointer-events-none
                            disabled:opacity-80
                            ${swipe ===
                                "right"
                                ? "bg-[#EC180E]"
                                : "bg-[#24262A]/95"
                            }
                        `}
                    >
                        <Heart
                            size={30}
                            strokeWidth={
                                swipe ===
                                    "right"
                                    ? 3
                                    : 2
                            }
                            color={
                                swipe ===
                                    "right"
                                    ? "#FFFFFF"
                                    : "#CD130A"
                            }
                            fill={
                                swipe ===
                                    "right"
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