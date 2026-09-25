'use client'

import { useIsDesktop } from '@/hooks/useIsDesktop'
import {
    motion,
    MotionValue,
    useMotionValue,
    useSpring,
    useTransform,
} from 'motion/react'
import Image from 'next/image'
import { useRef } from 'react'

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

    /*
     * Mouse parallax values
     */
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    /*
     * Hand scroll animation
     */
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

    /*
     * Smooth mouse movement
     */
    const springX = useSpring(x, {
        stiffness: 300,
        damping: 25,
    })

    const springY = useSpring(y, {
        stiffness: 300,
        damping: 25,
    })

    /*
     * Mouse parallax
     */
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
                overflow-hidden
                rounded-[5%]
            "
        >

            <div
                className="
                    absolute
                    inset-0
                    left-[5%]
                    top-10
                    border
                    rounded-[5%]
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
                    className="absolute inset-0 z-10"
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

            <motion.div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-20
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
                        right-0
                        bottom-0
                        select-none
                        scale-105
                        object-contain
                        object-bottom
                    "
                    draggable={false}
                />
            </motion.div>

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