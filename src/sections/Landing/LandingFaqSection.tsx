"use client"
import { googleSans, googleSansFlex } from "@/assets/fonts/font.google"
import { helveticaNow } from "@/assets/fonts/font.helveticaNow"
import FaqAccordion from "@/components/shared/Landing/FaqAccordion"
import FaqAccordionItem from "@/components/shared/Landing/FaqAccordionItem"
import Link from "next/link"

const LandingFaqSection = () => {
    return (
        <section className="w-full flex flex-col lg:flex-row lg:justify-around">
            <div
                className="
                    relative
                    z-30
                    w-full
                    flex
                    flex-col
                    gap-6
                    sm:gap-7
                    md:gap-8
                    lg:w-[50vw]
                    lg:gap-[4vh]
                    xl:max-w-[42vw]
                    2xl:max-w-[38vw]
                    3xl:max-w-[36vw]
                    4xl:max-w-[35vw]
                    5xl:max-w-[34vw]
                    7xl:max-w-[32vw]
                    8xl:max-w-[31vw]
                    9xl:max-w-[30vw]
                    10xl:max-w-[29vw]
                "
            >
                <h2
                    className={`
                        ${googleSansFlex.className}
                        leading-none
                        tracking-[0.01em]
                        text-green-brand
                        text-base
                        xs:text-lg
                        sm:text-xl
                        md:text-xl
                        lg:text-xl
                        xl:text-2xl
                        2xl:text-3xl
                        3xl:text-4xl
                        4xl:text-5xl
                        5xl:text-5xl
                        7xl:text-6xl
                        8xl:text-7xl
                        9xl:text-8xl
                        10xl:text-9xl
                    `}
                >
                    FAQ
                </h2>

                <h1
                    className={`
                        ${helveticaNow.className}
                        flex
                        w-full
                        shrink-0
                        flex-col
                        font-black
                        leading-[0.9]
                        tracking-[-0.02em]
                        text-4xl
                        xs:text-[12vw]
                        sm:text-[12vw]
                        md:text-[11vw]
                        lg:text-[8vw]
                        xl:text-[7.6vw]
                        2xl:text-[7.2vw]
                        3xl:text-[6.8vw]
                        4xl:text-[6.5vw]
                        5xl:text-[6.3vw]
                        7xl:text-[5.9vw]
                        8xl:text-[5.7vw]
                        9xl:text-[5.5vw]
                        10xl:text-[5.3vw]
                    `}
                >
                    <span className="block">
                        Everything{" "}
                        <span className="whitespace-nowrap">
                            you need
                        </span>
                    </span>

                    <span className="block">
                        to{" "}
                        <span className="whitespace-nowrap text-green-brand">
                            know.
                        </span>
                    </span>
                </h1>

                <p
                    className={`
                        ${googleSans.className}
                        w-100
                        tracking-[-0.01em]
                        leading-relaxed
                        text-muted-foreground
                        text-sm
                        xs:text-base
                        sm:text-lg
                        md:text-xl
                        lg:max-w-full
                        lg:text-2xl
                        3xl:text-[2.5vh]
                        4xl:text-[2.7vh]
                        5xl:text-[2.9vh]
                        7xl:text-[3.1vh]
                        8xl:text-[3.2vh]
                        9xl:text-[3.3vh]
                        10xl:text-[3.4vh]
                    `}
                >
                    Quick answers to common questions about{" "}
                    <Link
                        href="/"
                        className="
                            text-green-brand
                            transition-opacity
                            duration-200
                            hover:opacity-80
                        "
                    >
                        DevTinder
                    </Link>
                    .
                </p>
            </div>
            <div className="w-[35vw] mt-20">
                <FaqAccordion />
            </div>
        </section>
    )
}

export default LandingFaqSection