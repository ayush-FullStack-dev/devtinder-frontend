"use client";

import { googleSans, googleSansFlex } from "@/assets/fonts/font.google";
import LaptopModel from "@/components/shared/Model/LaptopModel";
import { motion } from "motion/react";

const LandingWhyDevTinderSection = () => {
    return (
        <section className="relative flex min-h-screen w-full shrink-0 overflow-hidden p-2 lg:p-4">
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
                        text-base 
                        text-green-brand
                         pl-0
                         lg:pl-5
                        xs:text-lg 
                        sm:text-xl 
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
                                lg:leading-[0.95]
                                tracking-tight
                                text-[16vw]
                                xs:text-[15vw]
                                sm:text-[13vw]
                                md:text-[9.5vw]
                                lg:w-[55vw]
                                lg:text-[9vw]
                            `}
                >
                    <motion.span>
                        Not another {""}
                    </motion.span>

                    <motion.span className="text-green-brand">
                        devloper {""}
                    </motion.span>

                    <motion.p>
                        directory.
                    </motion.p>
                </h1>
                <motion.div className={`
                                        ${googleSansFlex.className}
                                        max-w-xs
                                        text-sm
                                        leading-relaxed
                                          pl-0
                                       lg:pl-5
                                        text-muted-foreground
                                        xs:max-w-sm
                                        xs:text-base
                                        sm:max-w-md
                                        sm:text-lg
                                    `}>
                    <p>DevTinder is built for real connections.</p>
                    <p>No clutter. No noise. just the right developers,</p>
                    <p>building the right things, together.</p>
                </motion.div>
            </motion.div>

            <div className="w-[40vw] h-[50vh] flex justify-end z-5 absolute -right-5 bottom-0 top-0">
                {/* <LaptopModel /> */}
                <p>Implemnting 3d laptop model</p>
            </div>
        </section>
    );
};

export default LandingWhyDevTinderSection; 