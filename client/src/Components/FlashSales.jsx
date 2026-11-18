"use client"

import Image from "next/image"
import { FlashSale2 } from "@/data/products"
import { motion } from "motion/react"
import Link from "next/link"

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
            duration: 0.7,
            ease: "easeOut",
        },
    },
}

export default function FlashSales() {
    return (
        <section className="px-6">
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1800px] mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                    once: true,
                    amount: 0.1,
                }}
            >

                {FlashSale2.map((sale) => (
                    <Link
                        key={sale.id}
                        href={`/products/${sale.slug}`}
                        className="block"
                    >
                        <motion.div
                            variants={cardVariants}
                            whileHover={{ y: -10 }}
                            transition={{
                                duration: 0.3,
                                ease: "easeOut",
                            }}
                            style={{ backgroundColor: sale.bgColor }}
                            className="relative w-full h-[380px] z-10 flex justify-start border border-gray-200 rounded-3xl overflow-hidden"
                        >

                            {/* Sale Information */}
                            <div className="relative top-10 left-4 py-4 z-10">

                                <span className="text-xl text-black border border-gray-50 bg-white rounded-3xl px-3 py-2">
                                    {sale.discount}
                                </span>

                                <h3 className="pt-8 text-2xl md:text-3xl font-semibold text-white">
                                    {sale.name}
                                </h3>

                                <p className="pt-8 text-wrap text-lg text-white whitespace-pre-line">
                                    {sale.description}
                                </p>

                                <p className="pt-8 text-nowrap text-xl md:text-2xl font-semibold text-white">
                                    Starting From
                                    <br />
                                    {sale.startingPrice}K
                                </p>

                            </div>

                            <div className="absolute right-3 bottom-2 w-[45%] h-[95%]">

                                <motion.div
                                    className="relative w-full h-full"
                                    whileHover={{ scale: 1.06 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: "easeOut",
                                    }}
                                >
                                    <Image
                                        src={sale.image}
                                        alt={sale.name}
                                        fill
                                        className="object-contain object-right-bottom rounded-full"
                                    />
                                </motion.div>

                            </div>

                        </motion.div>
                    </Link>
                ))}

            </motion.div>

        </section>
    )
}