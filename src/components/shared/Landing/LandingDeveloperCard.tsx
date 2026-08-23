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
import { useEffect, useState } from "react";
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

    // Only the active/swipeable card needs this.
    swipeVal?: {
        swipeSide: null | "left" | "right";
    };
}

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
    const swipeSide = swipeVal?.swipeSide ?? null;

    const [activeIndex, setActiveIndex] = useState(0);

    const visibleTechStack = techStack.slice(0, 4);

    const remainingTechCount = Math.max(
        techStack.length - 4,
        0
    );

    const backProfileImg = () => {
        setActiveIndex((prev) =>
            Math.max(prev - 1, 0)
        );
    };

    const nextProfileImg = () => {
        setActiveIndex((prev) =>
            Math.min(
                prev + 1,
                Math.max(images.length - 1, 0)
            )
        );
    };

    useEffect(() => {
        setActiveIndex(0);
    }, [images.length]);

    useEffect(() => {
        if (!autoPlay || images.length <= 1) {
            return;
        }

        const interval = setInterval(() => {
            setActiveIndex(
                (prev) =>
                    (prev + 1) % images.length
            );
        }, duration);

        return () => {
            clearInterval(interval);
        };
    }, [
        activeIndex,
        autoPlay,
        images.length,
        duration,
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
                        relative
                        h-[67%]
                        min-h-65
                        w-full
                        group
                    "
                >
                    {images.length > 0 ? (
                        images.map((src, index) => (
                            <Image
                                key={`${src}-${index}`}
                                src={src}
                                alt={`${name} profile`}
                                fill
                                sizes="400px"
                                draggable={false}
                                className={`
                                    pointer-events-none
                                    object-cover
                                    object-top
                                    opacity-95
                                    dark:opacity-85
                                    ${
                                        index === activeIndex
                                            ? "block"
                                            : "hidden"
                                    }
                                `}
                            />
                        ))
                    ) : (
                        <div className="absolute inset-0 bg-muted" />
                    )}

                    {/* Swipe indicators are rendered only when swipeVal
                        is provided, meaning only the active card. */}

                    {swipeVal && (
                        <>
                            <div
                                className={`
                                    absolute
                                    top-8
                                    left-3
                                    z-30
                                    -rotate-25
                                    transition-opacity
                                    ${
                                        swipeSide === "left"
                                            ? "opacity-90"
                                            : "opacity-0"
                                    }
                                `}
                            >
                                <X
                                    size={76}
                                    strokeWidth={3}
                                />
                            </div>

                            <div
                                className={`
                                    absolute
                                    top-8
                                    left-5
                                    z-30
                                    rotate-25
                                    transition-opacity
                                    ${
                                        swipeSide === "right"
                                            ? "opacity-90"
                                            : "opacity-0"
                                    }
                                `}
                            >
                                <Heart
                                    size={80}
                                    color="#EF4444"
                                    fill="#EF4444"
                                />
                            </div>
                        </>
                    )}

                    {images.length > 1 && (
                        <>
                            <ImageProgress
                                total={images.length}
                                activeIndex={activeIndex}
                                duration={duration}
                                autoPlay={autoPlay}
                            />

                            <div className="absolute inset-0 z-10 flex lg:hidden">
                                <button
                                    type="button"
                                    aria-label="Previous image"
                                    onClick={backProfileImg}
                                    className="h-full w-1/2"
                                />

                                <button
                                    type="button"
                                    aria-label="Next image"
                                    onClick={nextProfileImg}
                                    className="h-full w-1/2"
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
                                <ChevronLeft
                                    size={35}
                                    onClick={backProfileImg}
                                    className={`
                                        rounded-full
                                        bg-black/45
                                        p-1
                                        text-white
                                        backdrop-blur-sm
                                        transition
                                        ${
                                            activeIndex === 0
                                                ? "cursor-not-allowed opacity-30"
                                                : "cursor-pointer opacity-90 hover:opacity-100"
                                        }
                                    `}
                                />

                                <ChevronRight
                                    size={35}
                                    onClick={nextProfileImg}
                                    className={`
                                        rounded-full
                                        bg-black/45
                                        p-1
                                        text-white
                                        backdrop-blur-sm
                                        transition
                                        ${
                                            activeIndex === images.length - 1
                                                ? "cursor-not-allowed opacity-30"
                                                : "cursor-pointer opacity-90 hover:opacity-100"
                                        }
                                    `}
                                />
                            </div>
                        </>
                    )}

                    <span
                        className="
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
                        flex
                        w-full
                        flex-col
                        gap-3
                        bg-background
                        px-3
                        py-3
                    "
                >
                    <div className="flex flex-col">
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
                                    truncate
                                    text-xs
                                `}
                            >
                                {location}
                            </p>
                        </div>
                    </div>

                    {techStack.length > 0 && (
                        <div className="flex flex-col gap-1">
                            <p>Tech Stack</p>

                            <div
                                className="
                                    flex
                                    min-w-0
                                    gap-2
                                "
                            >
                                {visibleTechStack.map(
                                    (tech, index) => (
                                        <span
                                            key={`${tech}-${index}`}
                                            className="
                                                flex
                                                h-10
                                                min-w-0
                                                flex-1
                                                items-center
                                                justify-center
                                                overflow-hidden
                                                rounded-xl
                                                bg-[#303131]
                                            "
                                        >
                                            <GetLogo name={tech} />
                                        </span>
                                    )
                                )}

                                {remainingTechCount > 0 && (
                                    <span
                                        className="
                                            flex
                                            h-10
                                            min-w-0
                                            flex-1
                                            items-center
                                            justify-center
                                            overflow-hidden
                                            whitespace-nowrap
                                            rounded-xl
                                            bg-[#303131]
                                            px-2
                                            text-xs
                                            text-white
                                            sm:px-3
                                            sm:text-sm
                                        "
                                    >
                                        +{remainingTechCount}

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