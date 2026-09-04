"use client";

import {
    googleSans,
    googleSansFlex,
} from "@/assets/fonts/font.google";
import LaptopModel from "@/components/shared/Model/LaptopModel";
import { useEffect, useRef, useState } from "react";

const LandingWhyDevTinderSection = () => {
    const sectionRef = useRef<HTMLElement>(null);

    const [isDesktop, setIsDesktop] = useState(false);
    const [shouldLoad3D, setShouldLoad3D] = useState(false);
    const [modelReady, setModelReady] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1024px)");

        const update = () => {
            setIsDesktop(mediaQuery.matches);
        };

        update();
        mediaQuery.addEventListener("change", update);

        return () => {
            mediaQuery.removeEventListener("change", update);
        };
    }, []);

    useEffect(() => {
        if (!isDesktop || shouldLoad3D) return;

        const section = sectionRef.current;
        const scrollContainer =
            document.getElementById("main-scroll");

        if (!section || !scrollContainer) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;

                setShouldLoad3D(true);
                observer.disconnect();
            },
            {
                root: scrollContainer,
                rootMargin: "600px 0px",
                threshold: 0,
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, [isDesktop, shouldLoad3D]);

    return (
        <section
            ref={sectionRef}
            className="
                relative
                flex
                min-h-svh
                w-full
                shrink-0
                flex-col
                overflow-visible
                p-2
                sm:p-4
                md:p-6
                lg:flex-row
                lg:items-center
                lg:p-6
                xl:p-8
                2xl:p-10
                3xl:p-12
                5xl:p-16
                7xl:p-20
                10xl:p-24
            "
        >
            <div
                className="
                    relative
                    z-30
                    flex
                    w-full
                    flex-col
                    gap-4
                    sm:gap-5
                    md:gap-6
                    lg:gap-[4vh]
                    lg:w-[55vw]
                    lg:max-w-262.5
                    xl:max-w-300
                    2xl:max-w-300
                    3xl:max-w-375
                    5xl:max-w-1750
                    7xl:max-w-2000
                    10xl:max-w-2300
                "
            >
                <h2
                    className={`
                        ${googleSansFlex.className}
                        pl-0
                        text-base
                        leading-none
                        text-green-brand
                        xs:text-lg
                        sm:text-xl
                        md:text-2xl
                        lg:pl-3
                        lg:text-2xl
                        2xl:text-3xl
                        3xl:text-4xl
                        5xl:text-5xl
                        7xl:text-6xl
                        10xl:text-7xl
                    `}
                >
                    WHY DEVTINDER
                </h2>

                <h1
                    className={`
                        ${googleSans.className}
                        w-full
                        shrink-0
                        font-bold
                        leading-[0.92]
                        tracking-[-0.04em]
                        text-[15vw]
                        xs:text-[14vw]
                        sm:text-[12vw]
                        md:text-[9vw]
                        lg:w-full
                        lg:text-[7.8vw]
                        lg:leading-[0.9]
                        xl:text-[7.5vw]
                        2xl:text-[7vw]
                        3xl:text-[6.5vw]
                        5xl:text-[6vw]
                        7xl:text-[5.5vw]
                        10xl:text-[5vw]
                    `}
                >
                    Not another{" "}
                    <span className="text-green-brand">
                        developer{" "}
                    </span>
                    <span>directory.</span>
                </h1>

                <div
                    className={`
                        ${googleSansFlex.className}
                        w-full
                        text-sm
                        leading-relaxed
                        text-muted-foreground
                        xs:max-w-sm
                        xs:text-base
                        sm:max-w-md
                        sm:text-lg
                        md:max-w-lg
                        md:text-xl
                        lg:max-w-full
                        lg:text-2xl
                        3xl:text-[2.5vh]
                    `}
                >
                    <p>
                        DevTinder is built for real connections.
                    </p>

                    <p>
                        No clutter. No noise. Just the right
                        developers,
                    </p>

                    <p>
                        building the right things, together.
                    </p>
                </div>
            </div>

            {isDesktop ? (
                <div
                    className="
                        pointer-events-none
                        absolute
                        right-[-18vw]
                        top-1/2
                        z-20
                        block
                        h-[105vh]
                        w-[78vw]
                        -translate-y-1/2
                        2xl:right-[-8vw]
                        2xl:h-screen
                        2xl:w-[58vw]
                        3xl:right-[-7vw]
                        3xl:h-[95vh]
                        3xl:w-[60vw]
                        5xl:right-[-7vw]
                        7xl:right-[-5vw]
                        5xl:h-dvh
                        5xl:w-[60vw]
                        10xl:right-[-4vw]
                    "
                >
                    <div
                        className={`
                            absolute
                            inset-0
                            h-full
                            w-[52vw]
                           ml-[10vw]
                            transition-opacity
                            duration-500
                            ease-in-out
                            ${modelReady
                                ? "opacity-0"
                                : "opacity-100"
                            }
                        `}
                    >
                        <img
                            src="/images/laptop-3D-fallback.png"
                            alt="DevTinder developer collaboration interface"
                            className="
                                absolute
                                inset-0
                                h-full
                                w-full
                                object-contain
                            "
                            loading="eager"
                            decoding="async"
                        />
                    </div>

                    {shouldLoad3D && (
                        <div
                            className={`
                                absolute
                                inset-0
                                h-full
                                w-full
                                transition-opacity
                                duration-500
                                ease-out
                                ${modelReady
                                    ? "opacity-100"
                                    : "opacity-0"
                                }
                            `}
                        >
                            <LaptopModel
                                onReady={() => setModelReady(true)}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div
                    className="
                        relative
                        mt-auto
                        flex
                        w-full
                        justify-center
                        overflow-visible
                        pt-12
                        xs:pt-16
                        sm:pt-20
                        md:pt-24
                    "
                >
                    <img
                        src="/images/LaptopModel.png"
                        alt="DevTinder developer collaboration interface"
                        className="
                            h-auto
                            w-full
                            min-w-0
                            max-w-175
                            object-contain
                            xs:max-w-[750px]
                            sm:max-w-112.5
                            md:max-w-250
                        "
                        loading="eager"
                        decoding="async"
                    />
                </div>
            )}
        </section>
    );
};

export default LandingWhyDevTinderSection;