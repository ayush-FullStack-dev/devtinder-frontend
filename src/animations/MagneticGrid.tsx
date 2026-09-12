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
    gap = 58,
    lineOpacity = 0.075,
    influence = 210,
    className = "",
}: MagneticGridProps) => {
    const containerRef =
        useRef<HTMLDivElement>(null);

    const canvasRef =
        useRef<HTMLCanvasElement>(null);

    const stateRef = useRef<{
        render:
            | ((time: number) => void)
            | null;
    }>({
        render: null,
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
                desynchronized: true,
            });

        if (!context) return;

        let width = 0;
        let height = 0;
        let dpr = 1;

        let animationFrame = 0;
        let isVisible = true;

        let theme = document.documentElement.classList.contains(
            "dark"
        )
            ? "dark"
            : "light";

        const pointer = {
            x: -1000,
            y: -1000,
            targetX: -1000,
            targetY: -1000,
            velocity: 0,
            targetVelocity: 0,
            initialized: false,
        };

        const gridX: number[] = [];
        const gridY: number[] = [];

        const rebuildGrid = () => {
            gridX.length = 0;
            gridY.length = 0;

            for (
                let x = 0;
                x <= width + gap;
                x += gap
            ) {
                gridX.push(x);
            }

            for (
                let y = 0;
                y <= height + gap;
                y += gap
            ) {
                gridY.push(y);
            }
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

            rebuildGrid();
        };

        const handlePointerMove = (
            event: PointerEvent
        ) => {
            if (!pointer.initialized) {
                pointer.x = event.clientX;
                pointer.y = event.clientY;
                pointer.targetX =
                    event.clientX;
                pointer.targetY =
                    event.clientY;
                pointer.initialized = true;
                pointer.targetVelocity = 0;
                return;
            }

            const dx =
                event.clientX -
                pointer.targetX;

            const dy =
                event.clientY -
                pointer.targetY;

            const distanceSquared =
                dx * dx + dy * dy;

            pointer.targetVelocity =
                Math.min(
                    Math.sqrt(distanceSquared),
                    80
                );

            pointer.targetX =
                event.clientX;

            pointer.targetY =
                event.clientY;
        };

        const resetPointer = () => {
            pointer.targetX = -1000;
            pointer.targetY = -1000;
            pointer.targetVelocity = 0;
            pointer.initialized = false;
        };

        const handleVisibility = () => {
            isVisible =
                document.visibilityState ===
                "visible";
        };

        const render = (
            elapsed: number
        ) => {
            if (
                !isVisible ||
                width <= 0 ||
                height <= 0
            ) {
                return;
            }

            pointer.x +=
                (
                    pointer.targetX -
                    pointer.x
                ) * 0.09;

            pointer.y +=
                (
                    pointer.targetY -
                    pointer.y
                ) * 0.09;

            pointer.velocity +=
                (
                    pointer.targetVelocity -
                    pointer.velocity
                ) * 0.14;

            pointer.targetVelocity *=
                0.9;

            context.clearRect(
                0,
                0,
                width,
                height
            );

            const rect =
                container.getBoundingClientRect();

            const mouseX =
                pointer.x - rect.left;

            const mouseY =
                pointer.y - rect.top;

            const radius =
                influence +
                pointer.velocity * 1.35;

            const radiusSquared =
                radius * radius;

            const interactionStrength =
                Math.min(
                    pointer.velocity / 35,
                    1
                );

            const time =
                elapsed * 0.001;

            const lineColor =
                theme === "dark"
                    ? "255,255,255"
                    : "0,0,0";

            const opacity =
                theme === "dark"
                    ? lineOpacity
                    : lineOpacity * 0.72;

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

                const distance = Math.sqrt(
                    distanceSquared
                );

                const normalized =
                    1 -
                    distance / radius;

                const falloff =
                    normalized *
                    normalized;

                const wave =
                    Math.sin(
                        distance * 0.038 -
                            time * 1.8
                    ) *
                    13 *
                    falloff;

                const pull =
                    9 *
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

                const displacement =
                    wave + pull;

                return {
                    x:
                        x +
                        (
                            dx /
                            safeDistance
                        ) *
                        displacement,

                    y:
                        y +
                        (
                            dy /
                            safeDistance
                        ) *
                        displacement,
                };
            };

            context.lineWidth = 0.7;
            context.strokeStyle =
                `rgba(${lineColor},${opacity})`;

            for (const x of gridX) {
                context.beginPath();

                for (
                    let index = 0;
                    index < gridY.length;
                    index++
                ) {
                    const point =
                        projectPoint(
                            x,
                            gridY[index]
                        );

                    if (index === 0) {
                        context.moveTo(
                            point.x,
                            point.y
                        );
                    } else {
                        context.lineTo(
                            point.x,
                            point.y
                        );
                    }
                }

                context.stroke();
            }

            for (const y of gridY) {
                context.beginPath();

                for (
                    let index = 0;
                    index < gridX.length;
                    index++
                ) {
                    const point =
                        projectPoint(
                            gridX[index],
                            y
                        );

                    if (index === 0) {
                        context.moveTo(
                            point.x,
                            point.y
                        );
                    } else {
                        context.lineTo(
                            point.x,
                            point.y
                        );
                    }
                }

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

        const themeObserver =
            new MutationObserver(() => {
                theme =
                    document.documentElement.classList.contains(
                        "dark"
                    )
                        ? "dark"
                        : "light";
            });

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
            resetPointer
        );

        document.addEventListener(
            "visibilitychange",
            handleVisibility
        );

        return () => {
            resizeObserver.disconnect();
            themeObserver.disconnect();

            window.removeEventListener(
                "pointermove",
                handlePointerMove
            );

            window.removeEventListener(
                "blur",
                resetPointer
            );

            document.removeEventListener(
                "visibilitychange",
                handleVisibility
            );

            stateRef.current.render =
                null;

            cancelAnimationFrame(
                animationFrame
            );
        };
    }, [
        gap,
        lineOpacity,
        influence,
    ]);

    useAnimationFrame((time) => {
        stateRef.current.render?.(
            time
        );
    });

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