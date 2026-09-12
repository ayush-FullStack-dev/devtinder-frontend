"use client";

import { useAnimationFrame } from "motion/react";
import { useEffect, useRef } from "react";

type MagneticGridProps = {
    gap?: number;
    lineOpacity?: number;
    influence?: number;
    className?: string;
};

const MagneticGrid = ({
    gap = 42,
    lineOpacity = 0.055,
    influence = 150,
    className = "",
}: MagneticGridProps) => {
    const containerRef =
        useRef<HTMLDivElement>(null);

    const canvasRef =
        useRef<HTMLCanvasElement>(null);

    const stateRef = useRef({
        render:
            null as ((time: number) => void) | null,
    });

    useEffect(() => {
        const container =
            containerRef.current;

        const canvas =
            canvasRef.current;

        if (!container || !canvas) return;

        const context =
            canvas.getContext("2d", {
                alpha: true,
            });

        if (!context) return;

        let width = 0;
        let height = 0;
        let dpr = 1;

        let themeObserver:
            MutationObserver | null = null;

        const pointer = {
            x: -1000,
            y: -1000,
            targetX: -1000,
            targetY: -1000,
            velocity: 0,
            targetVelocity: 0,
        };

        const getTheme = () => {
            return document.documentElement
                .classList.contains("dark")
                ? "dark"
                : "light";
        };

        const resize = () => {
            const rect =
                container.getBoundingClientRect();

            width = rect.width;
            height = rect.height;

            dpr = Math.min(
                window.devicePixelRatio || 1,
                2
            );

            canvas.width = Math.max(
                1,
                Math.round(width * dpr)
            );

            canvas.height = Math.max(
                1,
                Math.round(height * dpr)
            );

            canvas.style.width =
                `${width}px`;

            canvas.style.height =
                `${height}px`;

            context.setTransform(
                dpr,
                0,
                0,
                dpr,
                0,
                0
            );
        };

        const handlePointerMove = (
            event: PointerEvent
        ) => {
            const dx =
                event.clientX -
                pointer.targetX;

            const dy =
                event.clientY -
                pointer.targetY;

            const distance =
                Math.sqrt(
                    dx * dx + dy * dy
                );

            pointer.targetVelocity =
                Math.min(
                    distance,
                    80
                );

            pointer.targetX =
                event.clientX;

            pointer.targetY =
                event.clientY;
        };

        const handlePointerLeave = () => {
            pointer.targetX = -1000;
            pointer.targetY = -1000;
            pointer.targetVelocity = 0;
        };

        const render = (
            elapsed: number
        ) => {
            pointer.x +=
                (
                    pointer.targetX -
                    pointer.x
                ) * 0.075;

            pointer.y +=
                (
                    pointer.targetY -
                    pointer.y
                ) * 0.075;

            pointer.velocity +=
                (
                    pointer.targetVelocity -
                    pointer.velocity
                ) * 0.12;

            pointer.targetVelocity *=
                0.92;

            context.clearRect(
                0,
                0,
                width,
                height
            );

            const rect =
                canvas.getBoundingClientRect();

            const mouseX =
                pointer.x - rect.left;

            const mouseY =
                pointer.y - rect.top;

            const radius =
                influence +
                pointer.velocity * 1.2;

            const radiusSquared =
                radius * radius;

            const theme =
                getTheme();

            const baseOpacity =
                theme === "dark"
                    ? lineOpacity
                    : lineOpacity * 0.75;

            const lineColor =
                theme === "dark"
                    ? "255,255,255"
                    : "0,0,0";

            const interactionStrength =
                Math.min(
                    pointer.velocity / 35,
                    1
                );

            const time =
                elapsed * 0.001;

            context.lineWidth = 0.7;

            const projectPoint = (
                x: number,
                y: number
            ) => {
                const dx =
                    x - mouseX;

                const dy =
                    y - mouseY;

                const distanceSquared =
                    dx * dx + dy * dy;

                if (
                    distanceSquared >=
                    radiusSquared
                ) {
                    return {
                        x,
                        y,
                    };
                }

                const distance =
                    Math.sqrt(
                        distanceSquared
                    );

                const normalized =
                    1 -
                    distance /
                        radius;

                const falloff =
                    normalized *
                    normalized;

                const wave =
                    Math.sin(
                        distance * 0.045 -
                        time * 1.8
                    ) *
                    7 *
                    falloff;

                const pull =
                    5 *
                    falloff *
                    (
                        0.65 +
                        interactionStrength *
                        0.35
                    );

                const safeDistance =
                    Math.max(
                        distance,
                        1
                    );

                return {
                    x:
                        x +
                        (
                            dx /
                            safeDistance
                        ) *
                        (
                            wave +
                            pull
                        ),

                    y:
                        y +
                        (
                            dy /
                            safeDistance
                        ) *
                        (
                            wave +
                            pull
                        ),
                };
            };

            for (
                let x = 0;
                x <= width;
                x += gap
            ) {
                context.beginPath();

                let first = true;

                for (
                    let y = 0;
                    y <= height;
                    y += gap
                ) {
                    const point =
                        projectPoint(
                            x,
                            y
                        );

                    if (first) {
                        context.moveTo(
                            point.x,
                            point.y
                        );

                        first = false;
                    } else {
                        context.lineTo(
                            point.x,
                            point.y
                        );
                    }
                }

                context.strokeStyle =
                    `rgba(${lineColor},${baseOpacity})`;

                context.stroke();
            }

            for (
                let y = 0;
                y <= height;
                y += gap
            ) {
                context.beginPath();

                let first = true;

                for (
                    let x = 0;
                    x <= width;
                    x += gap
                ) {
                    const point =
                        projectPoint(
                            x,
                            y
                        );

                    if (first) {
                        context.moveTo(
                            point.x,
                            point.y
                        );

                        first = false;
                    } else {
                        context.lineTo(
                            point.x,
                            point.y
                        );
                    }
                }

                context.strokeStyle =
                    `rgba(${lineColor},${baseOpacity})`;

                context.stroke();
            }
        };

        stateRef.current.render =
            render;

        const resizeObserver =
            new ResizeObserver(resize);

        resizeObserver.observe(
            container
        );

        themeObserver =
            new MutationObserver(
                resize
            );

        themeObserver.observe(
            document.documentElement,
            {
                attributes: true,
                attributeFilter: [
                    "class",
                ],
            }
        );

        resize();

        window.addEventListener(
            "pointermove",
            handlePointerMove,
            {
                passive: true,
            }
        );

        window.addEventListener(
            "blur",
            handlePointerLeave
        );

        return () => {
            resizeObserver.disconnect();
            themeObserver?.disconnect();

            window.removeEventListener(
                "pointermove",
                handlePointerMove
            );

            window.removeEventListener(
                "blur",
                handlePointerLeave
            );

            stateRef.current.render =
                null;
        };
    }, [
        gap,
        lineOpacity,
        influence,
    ]);

    useAnimationFrame(
        (time) => {
            stateRef.current.render?.(
                time
            );
        }
    );

    return (
        <div
            ref={containerRef}
            className={`
                pointer-events-none
                absolute
                inset-0
                h-full
                w-full
                overflow-hidden
                ${className}
            `}
        >
            <canvas
                ref={canvasRef}
                className="
                    block
                    h-full
                    w-full
                "
                aria-hidden="true"
            />
        </div>
    );
};

export default MagneticGrid;