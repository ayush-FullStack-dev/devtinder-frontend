"use client";

import {
    googleSans,
    googleSansFlex,
} from "@/assets/fonts/font.google";
import { VscVerifiedFilled } from "react-icons/vsc";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import GetLogo from "../logo/GetLogo";
import {
    BriefcaseBusiness,
    ChevronLeft,
    ChevronRight,
    Heart,
    X,
} from "lucide-react";
import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { motion } from "motion/react";
import ImageProgress from "../ImageProgress";

interface LandingDeveloperCardProps {
    name: string;
    age: number | string;
    verified?: boolean;
    role: string;
    location: string;
    images: string[];
    isOnline: boolean;
    techStack: string[];
    duration?: number;
    autoPlay?: boolean;
    swipeVal?: {
        swipeSide: null | "left" | "right";
    };
}

const IMAGE_FADE_DURATION = 0.28;

const LandingDeveloperCard = ({
    name,
    age,
    verified = false,
    role,
    location,
    images,
    isOnline,
    techStack,
    duration = 8000,
    autoPlay = true,
    swipeVal,
}: LandingDeveloperCardProps) => {
    const swipeSide =
        swipeVal?.swipeSide ?? null;

    const [activeIndex, setActiveIndex] =
        useState(0);

    const [displayedIndex, setDisplayedIndex] =
        useState(0);

    const [pendingIndex, setPendingIndex] =
        useState<number | null>(null);

    const preloadCacheRef =
        useRef<Set<string>>(new Set());

    const imageSignature = useMemo(
        () => images.join("|"),
        [images]
    );

    const visibleTechStack =
        techStack.slice(0, 4);

    const remainingTechCount = Math.max(
        techStack.length - 4,
        0
    );

    const currentImage =
        images[activeIndex] ?? images[0];

    const displayedImage =
        images[displayedIndex] ?? images[0];

    const pendingImage =
        pendingIndex !== null
            ? images[pendingIndex]
            : null;

    const preloadImage = (src: string) => {
        if (
            !src ||
            preloadCacheRef.current.has(src)
        ) {
            return;
        }

        preloadCacheRef.current.add(src);

        const image =
            new window.Image();

        image.decoding = "async";
        image.src = src;

        if (image.complete) {
            if (image.naturalWidth === 0) {
                preloadCacheRef.current.delete(
                    src
                );
            }

            return;
        }

        image.onerror = () => {
            preloadCacheRef.current.delete(
                src
            );
        };
    };

    const backProfileImg = () => {
        setActiveIndex((prev) =>
            Math.max(prev - 1, 0)
        );
    };

    const nextProfileImg = () => {
        setActiveIndex((prev) =>
            Math.min(
                prev + 1,
                Math.max(
                    images.length - 1,
                    0
                )
            )
        );
    };

    const handlePendingImageLoad = (
        index: number
    ) => {
        if (index !== activeIndex) {
            return;
        }

        setDisplayedIndex(index);
        setPendingIndex(null);
    };

    const handlePendingImageError = (
        index: number
    ) => {
        if (index !== activeIndex) {
            return;
        }

        setPendingIndex(null);
        setActiveIndex(displayedIndex);
    };

    useEffect(() => {
        setActiveIndex(0);
        setDisplayedIndex(0);
        setPendingIndex(null);

        images.forEach((src) => {
            preloadImage(src);
        });
    }, [imageSignature]);

    useEffect(() => {
        if (
            activeIndex === displayedIndex ||
            !images[activeIndex]
        ) {
            return;
        }

        preloadImage(images[activeIndex]);

        setPendingIndex(activeIndex);

        const nextImage =
            images[activeIndex + 1];

        const previousImage =
            images[activeIndex - 1];

        if (nextImage) {
            preloadImage(nextImage);
        }

        if (previousImage) {
            preloadImage(previousImage);
        }
    }, [
        activeIndex,
        displayedIndex,
        imageSignature,
    ]);

    useEffect(() => {
        if (
            !autoPlay ||
            images.length <= 1
        ) {
            return;
        }

        const timeout =
            window.setTimeout(() => {
                setActiveIndex((prev) =>
                    prev >= images.length - 1
                        ? 0
                        : prev + 1
                );
            }, duration);

        return () => {
            window.clearTimeout(timeout);
        };
    }, [
        activeIndex,
        autoPlay,
        duration,
        imageSignature,
    ]);

    return (
        <div
            className="
                relative
                h-full
                w-full
                min-h-0
                overflow-hidden
                rounded-[24px]
                border
                border-border-primary
                bg-background
                select-none
                isolate
            "
        >
            <div
                className="
                    h-full
                    w-full
                    min-h-0
                    overflow-y-auto
                    overscroll-auto
                    scrollbar-hide
                "
            >
                <div
                    className="
                        group
                        relative
                        h-[67%]
                        min-h-65
                        w-full
                        overflow-hidden
                        bg-background
                        isolate
                        [contain:paint]
                    "
                >
                    <div
                        className="
                            absolute
                            inset-0
                            z-0
                            h-full
                            w-full
                            overflow-hidden
                            bg-background
                        "
                    >
                        {images.length > 0 ? (
                            <>
                                {displayedImage && (
                                    <Image
                                        key={`displayed-${displayedImage}`}
                                        src={
                                            displayedImage
                                        }
                                        alt={`${name} profile`}
                                        fill
                                        sizes="
                                            (max-width: 640px) 90vw,
                                            (max-width: 1024px) 80vw,
                                            400px
                                        "
                                        priority
                                        fetchPriority="high"
                                        draggable={false}
                                        className="
                                            pointer-events-none
                                            absolute
                                            inset-0
                                            h-full
                                            w-full
                                            object-cover
                                            object-top
                                            select-none
                                        "
                                    />
                                )}

                                {pendingImage && (
                                    <motion.div
                                        key={`pending-${pendingImage}`}
                                        initial={{
                                            opacity: 0,
                                        }}
                                        animate={{
                                            opacity: 1,
                                        }}
                                        transition={{
                                            duration:
                                                IMAGE_FADE_DURATION,
                                            ease: [
                                                0.22,
                                                1,
                                                0.36,
                                                1,
                                            ],
                                        }}
                                        className="
                                            pointer-events-none
                                            absolute
                                            inset-0
                                            z-10
                                            h-full
                                            w-full
                                            overflow-hidden
                                            bg-background
                                        "
                                    >
                                        <Image
                                            src={
                                                pendingImage
                                            }
                                            alt={`${name} profile`}
                                            fill
                                            sizes="
                                                (max-width: 640px) 90vw,
                                                (max-width: 1024px) 80vw,
                                                400px
                                            "
                                            priority={false}
                                            fetchPriority="auto"
                                            draggable={
                                                false
                                            }
                                            onLoad={() =>
                                                handlePendingImageLoad(
                                                    activeIndex
                                                )
                                            }
                                            onError={() =>
                                                handlePendingImageError(
                                                    activeIndex
                                                )
                                            }
                                            className="
                                                pointer-events-none
                                                absolute
                                                inset-0
                                                h-full
                                                w-full
                                                object-cover
                                                object-top
                                                select-none
                                            "
                                        />
                                    </motion.div>
                                )}

                                <div
                                    aria-hidden="true"
                                    className="
                                        pointer-events-none
                                        absolute
                                        inset-0
                                        z-20
                                        h-full
                                        w-full
                                        bg-transparent
                                    "
                                />
                            </>
                        ) : (
                            <div
                                className="
                                    absolute
                                    inset-0
                                    h-full
                                    w-full
                                    bg-muted
                                "
                            />
                        )}
                    </div>

                    {swipeSide && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.82,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 380,
                                damping: 26,
                                mass: 0.5,
                            }}
                            className={`
                                pointer-events-none
                                absolute
                                top-8
                                z-30
                                origin-center
                                ${
                                    swipeSide ===
                                    "right"
                                        ? "left-5"
                                        : "right-5"
                                }
                            `}
                        >
                            {swipeSide ===
                            "right" ? (
                                <Heart
                                    size={100}
                                    strokeWidth={2.5}
                                    color="#EF4444"
                                    fill="#EF4444"
                                />
                            ) : (
                                <X
                                    size={100}
                                    strokeWidth={4}
                                />
                            )}
                        </motion.div>
                    )}

                    {images.length > 1 && (
                        <>
                            <ImageProgress
                                total={
                                    images.length
                                }
                                activeIndex={
                                    activeIndex
                                }
                                duration={duration}
                                autoPlay={
                                    autoPlay
                                }
                            />

                            <div className="absolute inset-0 z-10 flex lg:hidden">
                                <button
                                    type="button"
                                    aria-label="Previous image"
                                    onClick={
                                        backProfileImg
                                    }
                                    disabled={
                                        activeIndex ===
                                        0
                                    }
                                    className="
                                        h-full
                                        w-1/2
                                        cursor-pointer
                                        disabled:cursor-default
                                    "
                                />

                                <button
                                    type="button"
                                    aria-label="Next image"
                                    onClick={
                                        nextProfileImg
                                    }
                                    disabled={
                                        activeIndex >=
                                        images.length -
                                            1
                                    }
                                    className="
                                        h-full
                                        w-1/2
                                        cursor-pointer
                                        disabled:cursor-default
                                    "
                                />
                            </div>

                            <div
                                className="
                                    absolute
                                    inset-y-0
                                    right-2
                                    left-2
                                    z-20
                                    hidden
                                    items-center
                                    justify-between
                                    lg:group-hover:flex
                                "
                            >
                                <button
                                    type="button"
                                    aria-label="Previous image"
                                    onClick={
                                        backProfileImg
                                    }
                                    disabled={
                                        activeIndex ===
                                        0
                                    }
                                    className="
                                        rounded-full
                                        bg-black/45
                                        text-white
                                        backdrop-blur-sm
                                        transition
                                        hover:bg-black/60
                                        disabled:cursor-not-allowed
                                        disabled:opacity-30
                                    "
                                >
                                    <ChevronLeft
                                        size={35}
                                        className="p-1"
                                    />
                                </button>

                                <button
                                    type="button"
                                    aria-label="Next image"
                                    onClick={
                                        nextProfileImg
                                    }
                                    disabled={
                                        activeIndex >=
                                        images.length -
                                            1
                                    }
                                    className="
                                        rounded-full
                                        bg-black/45
                                        text-white
                                        backdrop-blur-sm
                                        transition
                                        hover:bg-black/60
                                        disabled:cursor-not-allowed
                                        disabled:opacity-30
                                    "
                                >
                                    <ChevronRight
                                        size={35}
                                        className="p-1"
                                    />
                                </button>
                            </div>
                        </>
                    )}

                    <span
                        className="
                            pointer-events-none
                            absolute
                            bottom-3
                            left-3
                            z-20
                            flex
                            items-center
                            gap-2
                            text-white
                        "
                    >
                        <span
                            className={`
                                size-2
                                rounded-full
                                ${
                                    isOnline
                                        ? "animate-dot-blink bg-green-brand"
                                        : "bg-gray-400"
                                }
                            `}
                        />

                        <span
                            className={`
                                ${googleSansFlex.className}
                                text-xs
                            `}
                        >
                            {isOnline
                                ? "Online"
                                : "Active recently"}
                        </span>
                    </span>
                </div>

                <div
                    className="
                        relative
                        z-10
                        flex
                        w-full
                        flex-col
                        gap-3
                        bg-background
                        px-3
                        py-3
                        isolate
                    "
                >
                    <div
                        className="
                            relative
                            z-10
                            flex
                            flex-col
                        "
                    >
                        <div
                            className={`
                                ${googleSans.className}
                                mb-2
                                flex
                                items-center
                                gap-2
                            `}
                        >
                            <p className="text-lg">
                                {name} {age}
                            </p>

                            {verified && (
                                <VscVerifiedFilled
                                    className="
                                        h-6
                                        w-6
                                        shrink-0
                                        text-[#358FE5]
                                    "
                                />
                            )}
                        </div>

                        <div
                            className="
                                mb-1
                                flex
                                min-w-0
                                items-center
                                gap-2
                            "
                        >
                            <BriefcaseBusiness
                                size={15}
                                className="shrink-0"
                            />

                            <p
                                className={`
                                    ${googleSansFlex.className}
                                    min-w-0
                                    truncate
                                    text-xs
                                `}
                            >
                                {role}
                            </p>
                        </div>

                        <div
                            className="
                                mb-1
                                flex
                                min-w-0
                                items-center
                                gap-2
                            "
                        >
                            <CiLocationOn className="shrink-0" />

                            <p
                                className={`
                                    ${googleSansFlex.className}
                                    min-w-0
                                    truncate
                                    text-xs
                                `}
                            >
                                {location}
                            </p>
                        </div>
                    </div>

                    {techStack.length > 0 && (
                        <div
                            className="
                                relative
                                z-10
                                flex
                                flex-col
                                gap-1
                            "
                        >
                            <p
                                className="
                                    relative
                                    z-10
                                    select-none
                                "
                            >
                                Tech Stack
                            </p>

                            <div
                                className="
                                    relative
                                    z-10
                                    flex
                                    min-w-0
                                    gap-2
                                    select-none
                                "
                            >
                                {visibleTechStack.map(
                                    (
                                        tech,
                                        index
                                    ) => (
                                        <span
                                            key={`${tech}-${index}`}
                                            className="
                                                relative
                                                z-10
                                                flex
                                                h-10
                                                min-w-0
                                                flex-1
                                                shrink-0
                                                items-center
                                                justify-center
                                                overflow-hidden
                                                rounded-xl
                                                bg-[#303131]
                                                select-none
                                            "
                                        >
                                            <GetLogo
                                                name={
                                                    tech
                                                }
                                            />
                                        </span>
                                    )
                                )}

                                {remainingTechCount >
                                    0 && (
                                    <span
                                        className="
                                            relative
                                            z-10
                                            flex
                                            h-10
                                            min-w-0
                                            flex-1
                                            shrink-0
                                            items-center
                                            justify-center
                                            overflow-hidden
                                            whitespace-nowrap
                                            rounded-xl
                                            bg-[#303131]
                                            px-2
                                            text-xs
                                            text-white
                                            select-none
                                            sm:px-3
                                            sm:text-sm
                                        "
                                    >
                                        +
                                        {
                                            remainingTechCount
                                        }

                                        <span className="hidden sm:inline">
                                            &nbsp;more
                                        </span>
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LandingDeveloperCard;