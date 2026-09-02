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
        const mediaQuery = window.matchMedia(
            "(min-width: 1024px)"
        );

        const update = () => {
            setIsDesktop(mediaQuery.matches);
        };

        update();

        mediaQuery.addEventListener("change", update);

        return () => {
            mediaQuery.removeEventListener(
                "change",
                update
            );
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

        return () => {
            observer.disconnect();
        };
    }, [isDesktop, shouldLoad3D]);

    return (
        <section
            ref={sectionRef}
            className="
                relative
                flex
                min-h-screen
                w-full
                shrink-0
                flex-col
                overflow-visible
                p-2
                lg:flex-row
                lg:p-4
            "
        >
            <div
                className="
                    relative
                    z-30
                    flex
                    flex-col
                    gap-5
                "
            >
                <h2
                    className={`
                        ${googleSansFlex.className}
                        pl-0
                        text-base
                        text-green-brand
                        xs:text-lg
                        sm:text-xl
                        lg:pl-3
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
                        leading-none
                        tracking-tight
                        text-[16vw]
                        xs:text-[15vw]
                        sm:text-[13vw]
                        md:text-[9.5vw]
                        lg:w-[55vw]
                        lg:text-[9vw]
                        lg:leading-[0.95]
                    `}
                >
                    Not another{" "}
                    <span className="text-green-brand">
                        devloper{" "}
                    </span>
                    <span>
                        directory.
                    </span>
                </h1>

                <div
                    className={`
                        ${googleSansFlex.className}
                        max-w-xs
                        pl-0
                        text-sm
                        leading-relaxed
                        text-muted-foreground
                        xs:max-w-sm
                        xs:text-base
                        sm:max-w-md
                        sm:text-lg
                        lg:pl-5
                    `}
                >
                    <p>
                        DevTinder is built for real connections.
                    </p>

                    <p>
                        No clutter. No noise. just the right developers,
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
            right-[-14vw]
            -top-30
            z-20
            block
            h-[110vh]
            w-[75vw]
            2xl:right-[-5vw]
            2xl:w-[55vw]
        "
                >
                    <div
                        className={`
                absolute
                inset-0
                transition-opacity
                duration-300
                ease-in-out
                w-[55vw]
                 2xl:w-[40vw]
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
                            ml-20
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
                    transition-opacity
                    duration-300
                    ease-out
                    ${modelReady
                                    ? "opacity-100"
                                    : "opacity-0"
                                }
                `}
                        >
                            <LaptopModel
                                onReady={() =>
                                    setModelReady(true)
                                }
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div
                    className="
            relative
            mt-20
            flex
            w-full
            justify-center
        "
                >
                    <img
                        src="/images/LaptopModel.png"
                        alt="DevTinder developer collaboration interface"
                        className="
                h-auto
                w-full
                object-contain
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