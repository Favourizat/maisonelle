"use client"

import { Dot } from "lucide-react"
import { Trends } from "@/data/products"
import { motion } from "motion/react"
import Image from "next/image"

const text = "Trending Space Inspirations"

const headingVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.02,
        },
    },
}

const letterVariants = {
    hidden: {
        opacity: 0,
        x: 80,
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
}

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
}

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 90,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
}

export default function Trending() {
    return (
        <main className="px-6 mt-20">
            <div>

                
                <div className="flex items-center justify-center mx-4 mb-8">
                    <motion.h3
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                        }}
                        className="relative w-fit bg-white border border-gray-400 rounded-full shadow-2xl text-black text-2xl font-medium py-2 px-10"
                    >
                        <Dot
                            size={35}
                            strokeWidth={1.5}
                            className="absolute left-2 text-orange-600"
                        />

                        Trending Now
                    </motion.h3>
                </div>

              
                <motion.h2
                    className="text-4xl md:text-6xl font-semibold text-center mt-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={headingVariants}
                >
                    {text.split("").map((letter, index) => (
                        <motion.span
                            key={index}
                            variants={letterVariants}
                            className="inline-block"
                        >
                            {letter === " " ? "\u00A0" : letter}
                        </motion.span>
                    ))}
                </motion.h2>

          
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.1,
                    }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 my-3 md:my-4"
                >

                    {Trends.map((trend) => (

                        <motion.div
                            key={trend.id}
                            variants={cardVariants}
                            whileHover={{ y: -10 }}
                            className="border border-gray-50 rounded-2xl p-5 bg-gray-50"
                        >

                            <div className="relative h-[200px] w-full overflow-hidden rounded-lg">

                                <motion.div
                                    className="relative w-full h-full"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: "easeOut",
                                    }}
                                >
                                    <Image
                                        src={trend.image}
                                        alt={trend.category}
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>

                            </div>

                            
                            <div className="mt-4 flex items-center justify-between gap-6">

                                <h3 className="text-xl md:text-3xl font-bold">
                                    {trend.category}
                                </h3>

                                <h3 className="text-xl md:text-2xl">
                                    {trend.description}
                                </h3>

                            </div>

                        </motion.div>

                    ))}

                </motion.div>

            </div>
        </main>
    )
}