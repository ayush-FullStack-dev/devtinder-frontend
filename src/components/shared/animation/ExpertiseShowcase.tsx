"use client"

import { useIsDesktop } from "@/hooks/useIsDesktop"
import {
    motion,
    MotionValue,
    useMotionValue,
    useSpring,
    useTransform,
} from "motion/react"
import Image from "next/image"
import { useRef } from "react"

type ExpertiseShowcaseProps = {
    Progress: MotionValue<number>
    backgroundSrc: string
    lightSrc: string
    handSrc: string
    animatationAllow?: boolean
}

const ExpertiseShowcase = ({
    Progress,
    backgroundSrc,
    lightSrc,
    handSrc,
    animatationAllow = true,
}: ExpertiseShowcaseProps) => {
    const isDesktop = useIsDesktop()

    const ref = useRef<HTMLDivElement>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const handX = useTransform(
        Progress,
        [0.05, 0.45],
        [500, 0]
    )

    const handY = useTransform(
        Progress,
        [0, 0.35],
        [200, 0]
    )

    const springX = useSpring(x, {
        stiffness: 500,
        damping: 30,
    })

    const springY = useSpring(y, {
        stiffness: 500,
        damping: 30,
    })


    const handleMouseMove = (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        if (!animatationAllow || !isDesktop) return

        const element = ref.current

        if (!element) return

        const rect = element.getBoundingClientRect()

        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const offsetX = mouseX - rect.width / 2
        const offsetY = mouseY - rect.height / 2

        x.set(offsetX)
        y.set(offsetY)
    }

    return (
        <div
            ref={ref}
            onMouseMove={
                animatationAllow && isDesktop
                    ? handleMouseMove
                    : undefined
            }
            className="
                relative
                h-full
                w-full
                select-none
                overflow-visible
                rounded-[5%]
            "
        >

            <div
                className="
                    absolute
                    inset-0
                    rounded-[5%]
                    border
                  
                    overflow-hidden
                "
            >
                <Image
                    alt="product showcase background"
                    fill
                    src={backgroundSrc}
                    sizes="(max-width: 1024px) 95vw, 50vw"
                    className="object-cover"
                    draggable={false}
                />

                <motion.div
                    className="
                        absolute
                        inset-0
                        z-10
                    "
                    style={
                        animatationAllow && isDesktop
                            ? {
                                x: springX,
                                y: springY,
                            }
                            : undefined
                    }
                >
                    <Image
                        alt="light showcase"
                        fill
                        src={lightSrc}
                        sizes="(max-width: 1024px) 95vw, 50vw"
                        className="object-cover"
                        draggable={false}
                    />
                </motion.div>
            </div>

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
               
                    z-20
                    overflow-visible
                    [clip-path:inset(-100%_0_0_-100%_round_5%)]
                "
            >
                <motion.div
                    className="
                        absolute
                        inset-0
                        w-full
                        h-full
                        overflow-visible
                    "
                    style={
                        animatationAllow
                            ? {
                                x: handX,
                                y: handY,
                            }
                            : undefined
                    }
                >
                    <Image
                        alt="extra showcase"
                        src={handSrc}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="
                            absolute
                            inset-0
                            h-full
                            w-full
                            select-none
                            object-contain
                     object-bottom
                            scale-[110%]   
                        "
                        draggable={false}
                    />
                </motion.div>
            </div>

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-40
                "
            />

        </div>
    )
}

export default ExpertiseShowcase