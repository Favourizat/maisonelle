
"use client"

import Image from "next/image"
import { motion, MotionConfig } from "motion/react"

export default function ProductsHero() {
    return (
        <MotionConfig reducedMotion="user">
            <main>
                <section className="relative h-[300px] sm:h-[380px] md:h-[450px] lg:h-[520px] overflow-hidden">
                    <Image
                        src="/flashsale4.jpg"
                        alt="Premium furniture"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center"
                    />

                    <div className="absolute inset-0 bg-black/40" />

                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 35 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="font-[family-name:var(--font-cormorant)] text-5xl sm:text-6xl md:text-7xl font-medium tracking-wide text-white"
                        >
                            Premium Furniture
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.3,
                                ease: "easeOut",
                            }}
                            className="mt-4 text-sm sm:text-base font-medium tracking-wider text-white/90"
                        >
                            Home <span className="mx-2">/</span> Shop
                        </motion.p>

                    </div>
                </section>
            </main>
        </MotionConfig>
    )
}
