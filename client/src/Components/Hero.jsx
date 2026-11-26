"use client"

import Image from "next/image"
import {
    Sofa,
    Phone,
    Search,
    Heart,
    UserRound,
    ShoppingBag,
    ShoppingCart,
    Dot,
    ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react"


export default function Hero() {
    return (
        <main>
            <div>
               <div className="relative h-[600px] sm:h-[650px] md:h-[750px] overflow-hidden mx-1">
                    <div className="absolute inset-0">
                        <Image
                            src="/Hero3.jpg"
                            alt="Hero1"
                            className="object-cover object-center"
                            fill />
                    </div>

                    <div className="absolute inset-0 bg-black/60 z-10" />

                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                        <div className="w-full max-w-5xl px-4 sm:px-6 [font-family:var(--font-dm-sans)]">
                            <motion.span
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 1,
                                    delay: 0.3,
                                    ease: "easeOut"
                                }}
                                className="flex items-center justify-center mb-10"
                            >

                                <h3 className="relative flex items-center bg-[#6F4E37] border border-gray-400 rounded-full shadow-2xl text-white text-xl font-medium py-3  pl-9 pr-8 gap-4"
                                >
                                    <Dot
                                        size={35}
                                        strokeWidth={1.5}
                                        className="absolute left-2"
                                    />
                                    A Beautiful Home Starts Here
                                </h3>
                            </motion.span>

                            <motion.h3 className="flex flex-col items-center text-center font-bold text-white leading-tight tracking-wide">
                                <span className="flex flex-wrap justify-center gap-x-3 text-3xl md:text-4xl md:text-5xl lg:text-6xl">
                                    {["Beautifully", "Crafted", "Furniture", "&", "Decor"].map((word, index) => (
                                        <motion.span
                                            key={word}
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 1,
                                                delay: 0.3,
                                                ease: "easeOut",
                                            }}
                                        >
                                            {word}
                                        </motion.span>
                                    ))}
                                </span>

                                <span className="flex flex-wrap justify-center gap-x-3 mt-2 text-4xl md:text-6xl lg:text-7xl font-medium">
                                    {["For", "Inspired", "Living"].map((word, index) => (
                                        <motion.span
                                            key={word}
                                            initial={{ opacity: 0, x: 60 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: (index + 3) * 0.2,
                                                ease: "easeOut",
                                            }}
                                        >
                                            {word}
                                        </motion.span>
                                    ))}
                                </span>
                            </motion.h3>



                            <div className="flex text-center justify-center mt-20">
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.9,
                                        type: "spring"
                                    }}
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.95 }}
                                    className=" px-8 py-2 text-2xl border border-gray-500 bg-[#6F4E37] text-white rounded-full"
                                >
                                    Shop Now
                                </motion.button>
                                


                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </main >
    )
}
