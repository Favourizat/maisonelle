"use client"

import { motion } from "motion/react"
import { Dot } from "lucide-react"

const text = "Modern Living Inspirations"

const cardContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.18,
        },
    },
}

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 80,
        scale: 0.96,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
}

const videoCards = [
    "/furnitureVideo5.mp4",
    "/furnitureVideo4.mp4",
    "/furnitureVideo2.mp4",
    "/furnitureVideo3.mp4",
]

export default function DesignStories() {
    return (
        <main className="py-12 md:py-18 mx-auto max-w-[1600px]">

            <div className="flex items-center justify-center mx-4 mb-8">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                        duration: 0.7,
                        ease: "easeOut",
                    }}
                    className="relative w-fit bg-white border border-gray-400 rounded-full shadow-2xl text-black text-2xl md:text-3xl font-medium py-2 px-10"
                >
                    <Dot
                        size={35}
                        strokeWidth={1.5}
                        className="absolute left-2 text-orange-600"
                    />
                    Design Stories
                </motion.h3>
            </div>

            <motion.h2
                className="text-4xl md:text-6xl font-semibold text-center mt-6 mx-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.025,
                        },
                    },
                }}
            >
                {text.split("").map((letter, index) => (
                    <motion.span
                        key={index}
                        variants={{
                            hidden: {
                                opacity: 0,
                                x: 35,
                                scale: 0.7,
                            },
                            visible: {
                                opacity: 1,
                                x: 0,
                                scale: 1,
                                transition: {
                                    duration: 0.5,
                                    ease: "easeOut",
                                },
                            },
                        }}
                        className="inline-block"
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                ))}
            </motion.h2>

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 my-10 md:my-12 mx-4 md:mx-6"
                variants={cardContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {videoCards.map((video, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        whileHover={{
                            y: -8,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        }}
                        className="relative w-full h-[350px] md:h-[600px] overflow-hidden rounded-4xl"
                    >
                   
                        <motion.video
                            src={video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            whileHover={{ scale: 1.06 }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                            }}
                            className="absolute inset-0 w-full h-full object-cover object-center"
                        />

                    
                        <div className="absolute inset-0 bg-black/40 z-[1] pointer-events-none" />
                    </motion.div>
                ))}
            </motion.div>

        </main>
    )
}