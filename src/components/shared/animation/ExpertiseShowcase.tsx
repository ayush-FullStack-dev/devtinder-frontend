'use client'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import Image from 'next/image'

const ExpertiseShowcase = () => {
    const reducedMotion = useReducedMotion()

    return (
        <div className="relative h-[90vh] w-full">
            <div className="absolute inset-0 overflow-hidden rounded-4xl border">
                <Image
                    alt="product showcase background"
                    fill
                    src="/images/ExpertiseShowcase/bg.webp"
                    className="object-cover"
                />

            </div>

            <Image
                alt="light showcase"
                fill
                src="/images/ExpertiseShowcase/light.webp"
                className="absolute inset-0 z-10 object-cover"
            />
            
            <Image
                alt="light showcase"
                fill
                src="/images/ExpertiseShowcase/hand.webp"
                className="absolute inset-0 z-15 object-cover"
            />

        </div>
    )
}

export default ExpertiseShowcase