"use client";

import { useEffect, useRef, useState } from "react";

interface ImageProgressProps {
    total: number;
    activeIndex: number;
    duration?: number;
    className?: string;
    autoPlay: boolean;
}

const ImageProgress = ({
    total,
    activeIndex,
    duration = 5000,
    className = "",
    autoPlay,
}: ImageProgressProps) => {
    const [progress, setProgress] = useState(0);

    const frameRef = useRef(0);

    useEffect(() => {
        if (!autoPlay) {
            setProgress(0);
            return;
        }

        setProgress(0);

        const startTime = performance.now();

        let cancelled = false;

        const update = () => {
            if (cancelled) {
                return;
            }

            const elapsed =
                performance.now() - startTime;

            const nextProgress = Math.min(
                (elapsed / duration) * 100,
                100
            );

            setProgress(nextProgress);

            if (nextProgress < 100) {
                frameRef.current =
                    requestAnimationFrame(update);
            }
        };

        frameRef.current =
            requestAnimationFrame(update);

        return () => {
            cancelled = true;
            cancelAnimationFrame(frameRef.current);
        };
    }, [
        activeIndex,
        duration,
        autoPlay,
    ]);

    return (
        <div
            className={`
                absolute
                top-3
                right-3
                left-3
                z-30
                flex
                gap-1.5
                ${className}
            `}
        >
            {Array.from({ length: total }).map(
                (_, index) => {
                    const isPrevious =
                        index < activeIndex;

                    const isActive =
                        index === activeIndex;

                    return (
                        <div
                            key={index}
                            className="
                                relative
                                h-1
                                flex-1
                                overflow-hidden
                                rounded-full
                                bg-white/30
                            "
                        >
                            <div
                                className="
                                    absolute
                                    inset-y-0
                                    left-0
                                    rounded-full
                                    bg-white
                                "
                                style={{
                                    width: isPrevious
                                        ? "100%"
                                        : isActive
                                            ? `${progress}%`
                                            : "0%",
                                }}
                            />
                        </div>
                    );
                }
            )}
        </div>
    );
};

export default ImageProgress;