
"use client"

import Image from "next/image"
import { motion, MotionConfig } from "motion/react"

export default function CartHero() {
    return (
        <MotionConfig reducedMotion="user">
            <main>
                <div className="relative h-[300px] sm:h-[380px] md:h-[450px] overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src="/flashsale4.jpg"
                            alt="furniture1"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="absolute inset-0 bg-black/40 z-20" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.9,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <h2 className="text-4xl md:text-6xl text-white font-bold">
                                Cart
                            </h2>
                        </motion.div>
                        
                        <motion.div
                            className="py-6 flex items-center text-xl md:text-2xl font-semibold text-white"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.25,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <h2>Home /</h2>
                            <h2>Shop</h2>
                        </motion.div>
                    </div>
                </div>
            </main>
        </MotionConfig>
    )
}
