"use client"

import { BedDouble, Archive, Dot } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"

const featureVariants = {
    hidden: {
        opacity: 0,
        y: 60,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: "easeOut",
        },
    },
}

const benefitsContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
}

const benefitsVariants = {
    hidden: {
        opacity: 0,
        x: -40,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
}

export default function TvCabinet() {
    return (
        <main className="py-12 md:py-18 mx-10 max-w-[1600px]">

            <div className="flex flex-col md:flex-row gap-10 md:gap-14">

                <div className="w-full md:w-1/3 mt-3">

                    <motion.h1
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                        }}
                        className="font-[var(--font-cormorant)] text-4xl md:text-5xl lg:text-4xl leading-tight font-semibold text-[#3A2A22]"
                    >
                        Luxury TV Cabinets Crafted With Elegance
                    </motion.h1>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-6 mt-5"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={benefitsContainer}
                    >

                        <motion.div
                            variants={featureVariants}
                            className="flex items-start gap-3"
                        >
                            <BedDouble
                                size={36}
                                strokeWidth={1.5}
                                className="shrink-0 text-black"
                            />

                            <div>
                                <h3 className="font-bold text-black text-xl">
                                    Modern Minimal
                                    <br />
                                    Design
                                </h3>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={featureVariants}
                            className="flex items-start gap-3"
                        >
                            <Archive
                                size={36}
                                strokeWidth={1.5}
                                className="shrink-0 text-black"
                            />

                            <div>
                                <h3 className="font-bold text-black text-xl">
                                    Smart Storage
                                    <br />
                                    Spaces
                                </h3>
                            </div>
                        </motion.div>

                    </motion.div>

                    <motion.hr
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.2,
                            ease: "easeOut",
                        }}
                        style={{ transformOrigin: "left" }}
                        className="w-full border-gray-300 my-10"
                    />

                    <motion.div
                        className="flex flex-wrap items-center gap-x-8 py-1 mt-1 text-gray-600"
                        variants={benefitsContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >

                        <motion.span
                            variants={benefitsVariants}
                            className="flex items-center gap-1 text-lg md:text-xl"
                        >
                            <Dot
                                size={44}
                                strokeWidth={2.9}
                                className="text-orange-500 shrink-0"
                            />
                            <p>Premium Wood</p>
                        </motion.span>

                        <motion.span
                            variants={benefitsVariants}
                            className="flex items-center gap-1 mt-1 text-lg md:text-xl"
                        >
                            <Dot
                                size={44}
                                strokeWidth={2.9}
                                className="text-orange-500 shrink-0"
                            />
                            <p>Easy to Maintain</p>
                        </motion.span>

                        <motion.span
                            variants={benefitsVariants}
                            className="flex items-center gap-1 mt-1 text-lg md:text-xl"
                        >
                            <Dot
                                size={44}
                                strokeWidth={2.9}
                                className="text-orange-500 shrink-0"
                            />
                            <p>Durable Build Quality</p>
                        </motion.span>

                    </motion.div>

                </div>

                <motion.div
                    initial={{ opacity: 0, x: 70 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                        duration: 1,
                        delay: 0.2,
                        ease: "easeOut",
                    }}
                    className="relative w-full md:w-2/3 h-[350px] md:h-[400px] overflow-hidden rounded-4xl"
                >

                    <motion.div
                        className="absolute inset-0"
                        whileHover={{ scale: 1.04 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                        }}
                    >
                        <Image
                            src="/Tvcabinet1.jpg"
                            alt="Elegant modern furniture interior"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 70vw"
                            className="object-cover"
                        />
                    </motion.div>

                </motion.div>

            </div>

        </main>
    )
}