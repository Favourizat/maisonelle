"use client"
import Image from "next/image"
import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default function FlashSale() {
    return (
        <main className="px-5 py-10 md:px-6 md:py-20">
            <div className="w-full max-w-[1600px]">
                <div>
                    <div className="md:flex items-center justify-center gap-10">
                        <motion.div className="relative md:w-1/2 h-[400px] md:h-[600px] overflow-hidden border border-gray-400 rounded-4xl mb-8"
                            initial={{ opacity: 0, y: 200 }}
                            whileInView={{ opacity: 1, y: 0}}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: 1,
                                delay: 0.2,
                                ease: "easeOut"
                            }}>
                            <Image
                                src="/flashsale4.jpg"
                                alt="flashsale"
                                fill
                                className="object-cover"
                            />

                            <div className="absolute inset-0 bg-black/35 z-10" />

                            <div className="absolute inset-0 z-20 flex flex-col items-start">
                                <span className="[font-family:var(--font-cormorant)] font-semibold  text-xl md:text-4xl text-white mt-15 ml-12">
                                    Save Up to 50%
                                </span>

                                <h2 className="text-2xl md:text-5xl text-white font-bold mt-4 ml-12">
                                    Limited Time Flash Sale
                                </h2>

                                <Link
                                    href="/products/luxury-living-room-sofa"
                                    className="flex items-center mt-16 ml-12 gap-2 border border-gray-500 bg-white text-[#6F4E37] rounded-full pl-5 pr-2 py-2">

                                    <h2 className="text-xl md:text-2xl font-semibold">
                                        Shop Now
                                    </h2>

                                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
                                        <ArrowUpRight
                                            size={24}
                                            strokeWidth={1.5}
                                        />
                                    </span>

                                </Link>
                            </div>
                        </motion.div>

                        <motion.div className="relative md:w-1/2 h-[400px] md:h-[600px] overflow-hidden border border-gray-400 rounded-4xl mb-8"
                            initial={{ opacity: 0, y: 200 }}
                            whileInView={{ opacity: 1, y: 0}}
                            viewport={{ once: true, amount: 0.2}}
                            transition={{
                                duration: 1,
                                delay: 0.4,
                                ease: "easeOut"
                            }}>
                            <Image
                                src="/flashsale6.jpg"
                                alt="flashsale"
                                fill
                                className="object-cover"
                            />

                            <div className="absolute inset-0 bg-black/35 z-10" />

                            <div className="absolute inset-0 z-20 flex flex-col items-start">
                                <span className="[font-family:var(--font-cormorant)] font-semibold text-xl md:text-4xl text-white mt-15 ml-12">
                                    Extra 30% Off
                                </span>

                                <h2 className="text-2xl md:text-5xl text-white font-bold mt-4 ml-12">
                                    Mega Furniture Sale event
                                </h2>

                                <Link
                                    href="/products/modern-living-room-sofa"
                                    className="flex items-center mt-16 ml-12 gap-2 border border-gray-500 bg-white text-[#6F4E37] rounded-full pl-5 pr-2 py-2">

                                    <h2 className="text-xl md:text-2xl font-semibold">
                                        Shop Now
                                    </h2>

                                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
                                        <ArrowUpRight
                                            size={24}
                                            strokeWidth={1.5}
                                        />
                                    </span>

                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    )
}