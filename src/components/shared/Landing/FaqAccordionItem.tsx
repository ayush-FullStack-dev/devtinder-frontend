"use client"

import { googleSans, googleSansFlex } from "@/assets/fonts/font.google"
import { ChevronDown } from "lucide-react"
import { Separator } from "../../ui/separator"
import { AnimatePresence, motion } from "motion/react"

type FaqAccordionItemProps = {
    id: string
    question: string
    answer: string
    isOpen: boolean
    onToggle: (id: string) => void
}

const FaqAccordionItem = ({
    id,
    question,
    answer,
    isOpen,
    onToggle,
}: FaqAccordionItemProps) => {
    return (
        <div className="w-full">
            <button
                type="button"
                onClick={() => onToggle(id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${id}`}
                className="w-full flex flex-col gap-5 lg:gap-[3vh] 4xl:gap-[2vh] text-left cursor-pointer select-none"
            >
                {/* Question */}
                <div
                    className={`flex w-full items-center justify-between gap-6 transition-colors duration-200 ${
                        isOpen ? "text-green-brand" : ""
                    }`}
                >
                    <h2
                        className={`${googleSans.className} font-semibold text-xl lg:text-2xl 4xl:text-[1.3vw]`}
                    >
                        {question}
                    </h2>

                    <motion.div
                        initial={false}
                        animate={{
                            rotate: isOpen ? 180 : 0,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 450,
                            damping: 30,
                            mass: 0.45,
                        }}
                        className="shrink-0"
                    >
                        <ChevronDown className="size-8 lg:size-10 4xl:size-14 5xl:size-15 6xl:size-17 7xl:size-19 9xl:size-22" />
                    </motion.div>
                </div>

                {/* Answer */}
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            id={`faq-answer-${id}`}
                            initial={{
                                height: 0,
                                opacity: 0,
                                y: -4,
                            }}
                            animate={{
                                height: "auto",
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                height: 0,
                                opacity: 0,
                                y: -4,
                            }}
                            transition={{
                                height: {
                                    duration: 0.28,
                                    ease: [0.22, 1, 0.36, 1],
                                },
                                opacity: {
                                    duration: 0.18,
                                    ease: "easeOut",
                                },
                                y: {
                                    duration: 0.22,
                                    ease: [0.22, 1, 0.36, 1],
                                },
                            }}
                            className="w-[90%] overflow-hidden"
                        >
                            <p
                                className={`${googleSansFlex.className} pb-1 text-lg lg:text-xl 4xl:text-[1.5vw] text-muted-foreground`}
                            >
                                {answer}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Divider */}
                <motion.div
                    initial={false}
                    animate={{
                        opacity: isOpen ? 0 : 1,
                    }}
                    transition={{
                        duration: 0.18,
                    }}
                    className={isOpen ? "pointer-events-none" : ""}
                >
                    <Separator />
                </motion.div>
            </button>
        </div>
    )
}

export default FaqAccordionItem