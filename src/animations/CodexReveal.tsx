"use client";

import { useEffect, useRef } from "react";

type CodeRevealProps = {
    fontSize?: number;
    density?: number;
    maxOpacity?: number;
    damping?: number;
    velocity?: number;
    className?: string;
};

const CodeReveal = ({
    fontSize = 12,
    density = 1,
    maxOpacity = 0.35,
    damping = 0.95,
    velocity = 0.3,
    className = "",
}: CodeRevealProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;

        if (!container || !canvas) return;

        const context = canvas.getContext("2d");

        if (!context) return;

        let animationId: number | null = null;
        let width = 0;
        let height = 0;
        let columns = 0;
        let rows = 0;
        let idleFrames = 0;
        let paused = false;

        const cellWidth =
            (fontSize * 0.85) / density;

        const cellHeight =
            (fontSize * 1.15) / density;

        const characters = [
            "·",
            ".",
            "-",
            "~",
            "=",
            "+",
            "x",
            "*",
            "o",
        ];

        const lastCharacterIndex =
            characters.length - 1;

        const opacityValues = Array.from(
            { length: 15 },
            (_, index) =>
                `rgba(255, 255, 255, ${(
                    (index / 14) *
                    maxOpacity
                ).toFixed(3)})`
        );

        let current = new Float32Array(0);
        let previous = new Float32Array(0);

        const pointer = {
            x: -1,
            y: -1,
            prevX: -1,
            prevY: -1,
            isDown: false,
        };

        const reducedMotion = () =>
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

        const wake = () => {
            idleFrames = 0;

            if (paused) {
                paused = false;
                render();
            }
        };

        const disturb = (
            x: number,
            y: number,
            radius: number,
            force: number
        ) => {
            const centerColumn =
                Math.floor(x / cellWidth);

            const centerRow =
                Math.floor(y / cellHeight);

            for (
                let rowOffset = -radius;
                rowOffset <= radius;
                rowOffset++
            ) {
                for (
                    let columnOffset = -radius;
                    columnOffset <= radius;
                    columnOffset++
                ) {
                    const column =
                        centerColumn +
                        columnOffset;

                    const row =
                        centerRow +
                        rowOffset;

                    if (
                        column > 0 &&
                        column < columns - 1 &&
                        row > 0 &&
                        row < rows - 1
                    ) {
                        const distanceSquared =
                            columnOffset *
                            columnOffset +
                            rowOffset *
                            rowOffset;

                        const radiusSquared =
                            radius * radius;

                        if (
                            distanceSquared <
                            radiusSquared
                        ) {
                            const index =
                                row * columns +
                                column;

                            current[index] +=
                                force *
                                (
                                    1 -
                                    distanceSquared /
                                    radiusSquared
                                );
                        }
                    }
                }
            }

            if (!reducedMotion()) {
                wake();
            }
        };

        const resize = () => {
            const rect =
                container.getBoundingClientRect();

            width = rect.width;
            height = rect.height;

            canvas.width = width;
            canvas.height = height;

            columns =
                Math.ceil(
                    width / cellWidth
                ) + 2;

            rows =
                Math.ceil(
                    height / cellHeight
                ) + 2;

            const size =
                columns * rows;

            current =
                new Float32Array(size);

            previous =
                new Float32Array(size);

            if (reducedMotion()) {
                disturb(
                    width / 2,
                    height / 2,
                    6,
                    8
                );
            } else {
                idleFrames = 0;
                paused = false;
            }
        };

        const handlePointerMove = (
            event: PointerEvent
        ) => {
            const rect =
                canvas.getBoundingClientRect();

            pointer.x =
                event.clientX - rect.left;

            pointer.y =
                event.clientY - rect.top;

            if (pointer.prevX === -1) {
                pointer.prevX = pointer.x;
                pointer.prevY = pointer.y;
            }

            const deltaX =
                pointer.x - pointer.prevX;

            const deltaY =
                pointer.y - pointer.prevY;

            const distanceSquared =
                deltaX * deltaX +
                deltaY * deltaY;

            if (distanceSquared > 2) {
                const distance =
                    Math.sqrt(
                        distanceSquared
                    );

                const steps =
                    Math.min(
                        Math.floor(
                            distance / 6
                        ),
                        8
                    );

                const force =
                    Math.min(
                        distance * 0.12,
                        3.5
                    ) *
                    (
                        pointer.isDown
                            ? 1.8
                            : 1
                    );

                const radius =
                    pointer.isDown
                        ? 3
                        : 2;

                for (
                    let step = 0;
                    step <= steps;
                    step++
                ) {
                    const progress =
                        steps === 0
                            ? 0
                            : step / steps;

                    disturb(
                        pointer.prevX +
                        deltaX * progress,
                        pointer.prevY +
                        deltaY * progress,
                        radius,
                        force
                    );
                }
            }

            pointer.prevX = pointer.x;
            pointer.prevY = pointer.y;
        };

        const handlePointerDown = (
            event: PointerEvent
        ) => {
            pointer.isDown = true;

            const rect =
                canvas.getBoundingClientRect();

            pointer.x =
                event.clientX - rect.left;

            pointer.y =
                event.clientY - rect.top;

            if (pointer.x !== -1) {
                disturb(
                    pointer.x,
                    pointer.y,
                    5,
                    7
                );
            }
        };

        const handlePointerUp = () => {
            pointer.isDown = false;
        };

        const handlePointerLeave = () => {
            pointer.prevX = -1;
            pointer.prevY = -1;
        };

        const render = () => {
            context.clearRect(
                0,
                0,
                width,
                height
            );

            context.font =
                `${fontSize}px monospace`;

            context.textBaseline =
                "middle";

            context.textAlign =
                "center";

            let activeCells = 0;

            for (
                let row = 1;
                row < rows - 1;
                row++
            ) {
                const offset =
                    row * columns;

                for (
                    let column = 1;
                    column < columns - 1;
                    column++
                ) {
                    const index =
                        offset + column;

                    previous[index] =
                        (
                            current[index - 1] +
                            current[index + 1] +
                            current[index - columns] +
                            current[index + columns]
                        ) *
                        velocity -
                        previous[index];

                    previous[index] *= damping;
                }
            }

            const temp = current;

            current = previous;
            previous = temp;

            for (
                let row = 1;
                row < rows - 1;
                row++
            ) {
                const offset =
                    row * columns;

                const y =
                    row * cellHeight;

                for (
                    let column = 1;
                    column < columns - 1;
                    column++
                ) {
                    const index =
                        offset + column;

                    const amplitude =
                        Math.abs(
                            current[index]
                        );

                    if (amplitude > 0.008) {
                        activeCells++;

                        const x =
                            column * cellWidth;

                        const characterIndex =
                            Math.min(
                                (amplitude * 2.2) | 0,
                                lastCharacterIndex
                            );

                        const opacityIndex =
                            Math.min(
                                (amplitude * 6) | 0,
                                14
                            );

                        context.fillStyle =
                            opacityValues[
                            opacityIndex
                            ];

                        context.fillText(
                            characters[
                            characterIndex
                            ],
                            x,
                            y
                        );
                    }
                }
            }

            if (reducedMotion()) {
                return;
            }

            if (
                activeCells === 0 &&
                !pointer.isDown
            ) {
                idleFrames++;

                if (idleFrames > 30) {
                    paused = true;
                    return;
                }
            } else {
                idleFrames = 0;
            }

            animationId =
                requestAnimationFrame(render);
        };

        const resizeObserver =
            new ResizeObserver(resize);

        resizeObserver.observe(container);

        resize();

        window.addEventListener(
            "pointermove",
            handlePointerMove,
            { passive: true }
        );

        window.addEventListener(
            "pointerdown",
            handlePointerDown,
            { passive: true }
        );

        window.addEventListener(
            "pointerup",
            handlePointerUp,
            { passive: true }
        );

        window.addEventListener(
            "pointercancel",
            handlePointerUp,
            { passive: true }
        );

        window.addEventListener(
            "blur",
            handlePointerUp
        );

        window.addEventListener(
            "resize",
            resize
        );

        render();

        return () => {
            resizeObserver.disconnect();

            window.removeEventListener(
                "pointermove",
                handlePointerMove
            );

            window.removeEventListener(
                "pointerdown",
                handlePointerDown
            );

            window.removeEventListener(
                "pointerup",
                handlePointerUp
            );

            window.removeEventListener(
                "pointercancel",
                handlePointerUp
            );

            window.removeEventListener(
                "blur",
                handlePointerUp
            );

            window.removeEventListener(
                "resize",
                resize
            );

            if (animationId !== null) {
                cancelAnimationFrame(
                    animationId
                );
            }
        };
    }, [
        fontSize,
        density,
        maxOpacity,
        damping,
        velocity,
    ]);

    return (
        <div
            ref={containerRef}
            className={`
                relative
                h-full
                w-full
                min-h-[50px]
                min-w-[50px]
                overflow-hidden
                select-none
                bg-transparent
                ${className}
            `}
        >
            <canvas
                ref={canvasRef}
                className="
                    block
                    h-full
                    w-full
                    pointer-events-none
                "
                aria-hidden="true"
            />
        </div>
    );
};

export default CodeReveal;