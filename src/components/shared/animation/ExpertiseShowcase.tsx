'use client'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import Image from 'next/image'
import { useRef } from 'react'

const ExpertiseShowcase = ({ scrollYProgress }: { scrollYProgress: any }) => {
    const ref = useRef<HTMLDivElement>(null)
    const reducedMotion = useReducedMotion()
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const handY = useTransform(
        scrollYProgress,
        [0, 1],
        [40, 0]
    );

    const springX = useSpring(x, {
        stiffness: 300,
        damping: 25,
    });
    const springY = useSpring(y, {
        stiffness: 300,
        damping: 25,
    });

    console.log(handY)
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const element = ref.current;

        if (!element) return;

        const rect = element.getBoundingClientRect();

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const offsetX = mouseX - rect.width / 2;
        const offsetY = mouseY - rect.height / 2;

        x.set(offsetX);
        y.set(offsetY);
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            className="relative h-[90vh] w-full rounded-4xl select-none"
        >
            <div className="absolute left-[15%] top-15 inset-0 overflow-hidden rounded-4xl border">
                <Image
                    alt="product showcase background"
                    fill
                    src="/images/ExpertiseShowcase/bg.webp"
                    className="object-cover"
                    draggable={false}
                />

                <motion.div
                    className="absolute inset-0 z-10"
                    style={{
                        x: springX,
                        y: springY,
                    }}
                >
                    <Image
                        alt="light showcase"
                        fill
                        src="/images/ExpertiseShowcase/light.webp"
                        className="object-cover"
                        draggable={false}
                    />
                </motion.div>
            </div>

            <motion.div
                style={{
                    y: handY,
                }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut",
                }}
            >
                <img
                    alt="extra showcase"
                    src="/images/ExpertiseShowcase/hand.webp"
                    className="select-none absolute w-full h-full z-20"
                    draggable={false}
                />
            </motion.div>
            <div className='absolute w-full h-full z-30 opacity-0' />
        </div >
    )
}

export default ExpertiseShowcase