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
        <motion.div
            layout
            className="w-full flex flex-col gap-4"
            onClick={() => onToggle(id)}
        >
            <motion.div
                layout="position"
                className={`flex w-full justify-between items-center cursor-pointer select-none ${
                    isOpen ? "text-green-brand" : ""
                }`}
            >
                <h2
                    className={`${googleSans.className} font-semibold text-xl`}
                >
                    {question}
                </h2>

                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                        mass: 0.5,
                    }}
                    className="shrink-0"
                >
                    <ChevronDown size={30} />
                </motion.div>
            </motion.div>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        layout
                        initial={{
                            opacity: 0,
                            y: -6,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.22,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="w-[90%] overflow-hidden"
                    >
                        <p
                            className={`${googleSansFlex.className} text-lg text-muted-foreground`}
                        >
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div layout>
                {!isOpen && <Separator />}
            </motion.div>
        </motion.div>
    )
}

export default FaqAccordionItem