"use client";

import { googleSans, googleSansFlex } from "@/assets/fonts/font.google";
import LaptopModel from "@/components/shared/Model/LaptopModel";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const LandingWhyDevTinderSection = () => {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1024px)");

        const update = () => setIsDesktop(mediaQuery.matches);

        update();
        mediaQuery.addEventListener("change", update);

        return () => {
            mediaQuery.removeEventListener("change", update);
        };
    }, []);

    return (
        <section className="relative flex min-h-screen w-full shrink-0 flex-col overflow-hidden p-2 lg:flex-row lg:p-4">
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.97,
                }}
                whileInView={{
                    opacity: 1,
                    scale: 1,
                }}
                viewport={{
                    once: true,
                    amount: 0.3,
                }}
                transition={{
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                }}
                className="
                    relative
                    z-10
                    flex
                    flex-col
                    gap-5
                    will-change-transform
                "
            >
                <motion.h2
                    initial={{
                        opacity: 0,
                        y: 10,
                        letterSpacing: "0.1em",
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        letterSpacing: "0em",
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        delay: 0.05,
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                    }}
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
                </motion.h2>

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
                    <motion.span>
                        Not another{" "}
                    </motion.span>

                    <motion.span className="text-green-brand">
                        devloper{" "}
                    </motion.span>

                    <motion.p>
                        directory.
                    </motion.p>
                </h1>

                <motion.div
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
                    <p>DevTinder is built for real connections.</p>
                    <p>No clutter. No noise. just the right developers,</p>
                    <p>building the right things, together.</p>
                </motion.div>
            </motion.div>

            {isDesktop ? (
                <div
                    className="
                        absolute
                        -right-10
                        -top-25
                        z-5
                        hidden
                        h-[120vh]
                        w-[50vw]
                        lg:block
                    "
                >
                    <LaptopModel />
                </div>
            ) : (
                <div className="relative mt-20 flex h-auto w-full justify-center">
                    <img
                        src="/images/LaptopModel.png"
                        alt="LaptopModel"
                        className="h-auto w-full object-contain"
                    />

                    <div className="absolute inset-0 z-10 h-auto w-full opacity-0">
                    </div>
                </div>
            )}
        </section>
    );
};

export default LandingWhyDevTinderSection;