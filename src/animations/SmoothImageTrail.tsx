"use client";

import {
    AnimatePresence,
    motion,
} from "motion/react";
import {
    useRef,
    useState,
} from "react";

type TrailImage = {
    id: number;
    x: number;
    y: number;
    src: string;
    rotation: number;
};

type SmoothImageTrailProps = {
    images: string[];
};

const SmoothImageTrail = ({
    images,
}: SmoothImageTrailProps) => {
    const containerRef =
        useRef<HTMLDivElement>(null);

    const lastPosition =
        useRef({
            x: 0,
            y: 0,
        });

    const imageIndex =
        useRef(0);

    const idRef =
        useRef(0);

    const [trail, setTrail] =
        useState<TrailImage[]>([]);

    const handlePointerMove = (
        event: React.PointerEvent<HTMLDivElement>
    ) => {
        if (!images.length) return;

        const container =
            containerRef.current;

        if (!container) return;

        const rect =
            container.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const dx =
            x - lastPosition.current.x;

        const dy =
            y - lastPosition.current.y;

        const distance = Math.sqrt(
            dx * dx + dy * dy
        );

        if (distance < 50) return;

        lastPosition.current = {
            x,
            y,
        };

        const src =
            images[
                imageIndex.current %
                    images.length
            ];

        imageIndex.current += 1;

        idRef.current += 1;

        const rotation = Math.max(
            -12,
            Math.min(
                12,
                dx * 0.08
            )
        );

        const newImage: TrailImage = {
            id: idRef.current,
            x,
            y,
            src,
            rotation,
        };

        setTrail((previous) => [
            ...previous,
            newImage,
        ].slice(-6));
    };

    const handlePointerLeave = () => {
        lastPosition.current = {
            x: 0,
            y: 0,
        };
    };

    return (
        <div
            ref={containerRef}
            onPointerMove={
                handlePointerMove
            }
            onPointerLeave={
                handlePointerLeave
            }
            className="
                relative
                h-[500px]
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-white/10
            "
        >
            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                "
            >
                <AnimatePresence>
                    {trail.map(
                        (item) => (
                            <motion.img
                                key={item.id}
                                src={item.src}
                                alt=""
                                initial={{
                                    opacity: 0,
                                    scale: 0.7,
                                    rotate:
                                        item.rotation -
                                        6,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    rotate:
                                        item.rotation,
                                    x:
                                        item.x -
                                        100,
                                    y:
                                        item.y -
                                        100,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.75,
                                    filter:
                                        "blur(4px)",
                                }}
                                transition={{
                                    opacity: {
                                        duration:
                                            0.25,
                                    },
                                    scale: {
                                        duration:
                                            0.45,
                                        ease:
                                            "easeOut",
                                    },
                                    rotate: {
                                        duration:
                                            0.45,
                                        ease:
                                            "easeOut",
                                    },
                                    x: {
                                        duration:
                                            0.5,
                                        ease:
                                            "easeOut",
                                    },
                                    y: {
                                        duration:
                                            0.5,
                                        ease:
                                            "easeOut",
                                    },
                                    filter: {
                                        duration:
                                            0.45,
                                    },
                                }}
                                className="
                                    absolute
                                    left-0
                                    top-0
                                    h-[200px]
                                    w-[200px]
                                    rounded-2xl
                                    object-cover
                                    shadow-2xl
                                "
                            />
                        )
                    )}
                </AnimatePresence>
            </div>

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                "
            >
                <span
                    className="
                        rounded-full
                        border
                        border-white/10
                        bg-black/20
                        px-4
                        py-2
                        text-sm
                        text-white/40
                        backdrop-blur-sm
                    "
                >
                    Move your cursor
                </span>
            </div>
        </div>
    );
};

export default SmoothImageTrail;