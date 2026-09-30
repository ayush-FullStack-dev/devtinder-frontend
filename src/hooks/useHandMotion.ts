import {
    useSpring,
    useTransform,
    type MotionValue,
} from "motion/react";

export type HandMotionOptions = {
    x: [string, string];
    y: [number, number];
    rotate: [string, string];
};

export const useHandMotion = (
    scrollYProgress: MotionValue<number>,
    options: HandMotionOptions,
) => {
    const x = useTransform(
        scrollYProgress,
        [0, 0.42],
        [...options.x],
    );

    const springX = useSpring(x, {
        stiffness: 120,
        damping: 26,
        mass: 0.8,
    });

    const y = useTransform(
        scrollYProgress,
        [0, 0.42],
        [...options.y],
    );

    const springY = useSpring(y, {
        stiffness: 130,
        damping: 27,
        mass: 0.75,
    });

    const rotateDeg = useTransform(
        scrollYProgress,
        [0, 0.42],
        [...options.rotate],
    );

    const rotate = useSpring(rotateDeg, {
        stiffness: 110,
        damping: 25,
        mass: 0.8,
    });

    return {
        x: springX,
        y: springY,
        rotate,
    };
};