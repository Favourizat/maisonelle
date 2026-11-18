"use client"

import { Dot, ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"
import { NewArrivals1, NewArrivals2 } from "@/data/products"
import Image from "next/image"
import Link from "next/link"

const text = "Discover Our New Arrivals"

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
        x: 40,
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

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 70,
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

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
}

export default function NewArrivals() {
    return (
        <main className="px-6 md:px-8 py-13 md:py-26 bg-pink-50 mt-35">

            <div className="flex flex-col lg:flex-row items-start lg:items-end mx-0 md:mx-4 justify-between gap-5 lg:gap-12">

                <div className="mb-5">
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

                        New Arrivals
                    </motion.h3>

                    <motion.h2
                        className="text-2xl md:text-5xl font-semibold text-center mt-6"
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

                </div>

                <motion.h3
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.2,
                        ease: "easeOut",
                    }}
                    className="mt-2 md:mt-10 text-2xl md:w-1/2"
                >
                    Discover beautifully crafted furniture that transforms everyday spaces into elegant, comfortable, and welcoming homes.
                </motion.h3>

            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">

                <Link
                    href={`/products/${NewArrivals1[0].slug}`}
                    className="block"
                >
                    <motion.div
                        className="relative w-full h-[900px] overflow-hidden rounded-3xl"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        whileHover={{ y: -10 }}
                    >

                        <motion.div
                            className="absolute inset-0"
                            whileHover={{ scale: 1.05 }}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut",
                            }}
                        >
                            <Image
                                src={NewArrivals1[0].image}
                                alt={NewArrivals1[0].name}
                                fill
                                className="object-cover"
                            />
                        </motion.div>

                        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

                        <div className="absolute z-10 bottom-8 sm:bottom-12 lg:bottom-16 left-5 sm:left-8 lg:left-12 right-5 sm:right-8 pointer-events-none">

                            <h3 className="relative w-fit bg-white border border-gray-400 rounded-full shadow-2xl text-black text-2xl font-medium py-2 px-10">
                                <Dot
                                    size={35}
                                    strokeWidth={1.5}
                                    className="absolute left-2 text-orange-600"
                                />

                                {NewArrivals1[0].sale}
                            </h3>

                            <h2 className="mt-7 text-4xl md:text-5xl text-white font-bold">
                                {NewArrivals1[0].tagline}
                            </h2>

                            <h2 className="mt-7 text-3xl text-white">
                                {NewArrivals1[0].description}
                            </h2>

                            <span className="flex items-start gap-4">

                                <h2 className="text-2xl font-bold md:text-4xl mt-13 px-15 py-3 border border-gray-500 bg-[#6F4E37] text-white rounded-full cursor-pointer transition-all hover:text-black hover:bg-white">
                                    Shop Now
                                </h2>

                                <ArrowUpRight
                                    size={41}
                                    strokeWidth={1.8}
                                    className="text-[#6F4E37] mx-[-60px] text-2xl mt-16 border border-gray-600 bg-white rounded-full transition-all hover:bg-black hover:text-white"
                                />

                            </span>

                        </div>

                    </motion.div>
                </Link>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.1,
                    }}
                >

                    {NewArrivals2.map((index) => (
                        <Link
                            href={`/products/${index.slug}`}
                            key={index.id}
                            className="block"
                        >
                            <motion.div
                                className="relative w-full h-[300px] sm:h-[350px] lg:h-[410px] overflow-hidden rounded-3xl"
                                variants={cardVariants}
                                whileHover={{ y: -10 }}
                            >

                                <motion.div
                                    className="absolute inset-0"
                                    whileHover={{ scale: 1.06 }}
                                    transition={{
                                        duration: 0.6,
                                        ease: "easeOut",
                                    }}
                                >
                                    <Image
                                        src={index.image}
                                        alt={index.name}
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>

                                <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                                
                                <div className="absolute z-10 bottom-10 left-5 md:left-15 pointer-events-none">

                                    <h2 className="mt-7 text-3xl md:text-4xl text-white font-bold">
                                        {index.name}
                                    </h2>

                                    <h2 className="text-3xl md:text-2xl text-white font-semibold">
                                        {index.sale}
                                    </h2>

                                </div>

                            </motion.div>
                        </Link>
                    ))}

                </motion.div>

            </div>

        </main>
    )
}