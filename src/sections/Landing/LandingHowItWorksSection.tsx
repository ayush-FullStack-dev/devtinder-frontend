"use client";

import { useEffect, useRef, useState } from "react";
import {
    motion,
    useMotionValue,
    useTransform,
} from "motion/react";

import {
    googleSans,
    googleSansFlex,
} from "@/assets/fonts/font.google";

import MacWindowFrame from "@/components/shared/frames/MacWindowFrame";

const LandingHowItWorksSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const scrollProgress = useMotionValue(0);

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const container = document.getElementById("main-scroll");

        if (!container) return;

        const updateProgress = () => {
            const section = sectionRef.current;

            if (!section) return;

            const containerRect = container.getBoundingClientRect();
            const sectionRect = section.getBoundingClientRect();

            const sectionTop =
                sectionRect.top - containerRect.top;

            const scrollDistance =
                section.offsetHeight - container.clientHeight;

            if (scrollDistance <= 0) return;

            const progressValue = Math.max(
                0,
                Math.min(
                    1,
                    -sectionTop / scrollDistance
                )
            );

            scrollProgress.set(progressValue);
            setProgress(progressValue);
        };

        updateProgress();

        container.addEventListener(
            "scroll",
            updateProgress,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            updateProgress
        );

        return () => {
            container.removeEventListener(
                "scroll",
                updateProgress
            );

            window.removeEventListener(
                "resize",
                updateProgress
            );
        };
    }, []);

    const textY = useTransform(
        scrollProgress,
        [0, 0.45],
        [0, -90]
    );

    const opacity = useTransform(
        scrollProgress,
        [0, 0.45],
        [1, 0.2]
    );

    const scale = useTransform(
        scrollProgress,
        [0, 0.45],
        [1, 0.94]
    );

    return (
        <section
            ref={sectionRef}
            className="
                relative
                min-h-[170vh]
                w-full
                shrink-0
                sm:px-4
                px-2
            "
        >

            <motion.div
                className="
                    sticky
                    top-0
                    z-0
                    flex
                    h-dvh
                    w-full
                    items-center
                    justify-center
                "
            >
                <motion.div
                    style={{
                        opacity,
                        y: textY,
                        scale,
                    }}
                    className="
                        flex
                        flex-col
                        items-center
                    "
                >
                    <h2
                        className={`
                            ${googleSansFlex.className}
                            text-xl
                            text-green-brand
                        `}
                    >
                        HOW IT WORKS
                    </h2>

                    <h1
                        className={`
                            ${googleSans.className}
                            flex
                            w-full
                            flex-col
                            items-center
                            text-4xl
                            xs:text-[12vw]
                            sm:text-[12vw]
                            md:text-[11vw]
                            lg:text-[8vw]
                            font-bold
                            leading-[0.95]
                            tracking-tight
                        `}
                    >
                        <p>From connection</p>

                        <p>
                            to{" "}
                            <span className="text-green-brand">
                                creation.
                            </span>
                        </p>
                    </h1>
                </motion.div>
            </motion.div>

            <div
                className="
                    relative
                    z-10
                    mt-[-8vh]
                    isolate
                "
            >
                <MacWindowFrame className="mx-auto w-full lg:max-w-[83vw] hidden sm:block">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        src="/videos/LandingHowItWorks.mp4"
                        className="
                            block
                            aspect-video
                            w-full
                            object-cover
                        "
                    />
                </MacWindowFrame>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    src="/videos/comp.mp4"
                    className="
                            block
                            aspect-video
                            w-full
                            object-cover
                            rounded-lg
                            sm:hidden
                        "
                />
            </div>
        </section>
    );
};

export default LandingHowItWorksSection;