"use client";

import { useEffect, useState } from "react";

interface ImageProgressProps {
    total: number;
    activeIndex: number;
    duration?: number;
    className?: string;
    autoPlay: boolean
}

const ImageProgress = ({
    total,
    activeIndex,
    duration = 5000,
    className = "",
    autoPlay
}: ImageProgressProps) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!autoPlay) return;

        setProgress(0);

        const startTime = Date.now();

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const nextProgress = Math.min((elapsed / duration) * 100, 100);

            setProgress(nextProgress);

            if (nextProgress >= 100) {
                clearInterval(interval);
            }
        }, 16);

        return () => clearInterval(interval);
    }, [activeIndex, duration, autoPlay]);

    return (
        <div
            className={`absolute top-3 left-3 right-3 z-30 flex gap-1.5 ${className}`}
        >
            {Array.from({ length: total }).map((_, index) => {
                const isPrevious = index < activeIndex;
                const isActive = index === activeIndex;

                return (
                    <div
                        key={index}
                        className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/30"
                    >
                        <div
                            className="absolute inset-y-0 left-0 rounded-full bg-white"
                            style={{
                                width: isPrevious
                                    ? "100%"
                                    : isActive
                                        ? `${progress}%`
                                        : "0%",
                                transition: "none",
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ImageProgress;