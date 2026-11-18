"use client"

import { Dot } from "lucide-react"
import { motion } from "motion/react"
import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"

const text = "Discover Top Rated Products"

const containerVariants = {
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
        x: 30,
        scale: 0.7,
    },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
}

const cardContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
}

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 100,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
}

export default function TopRatedProducts() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/products`
                )

                const data = await response.json()

                if (data.success) {
                    console.log("fetched products", data.products)

                    setProducts(data.products)
                }

            } catch (error) {
                console.error("Error fetching products:", error)
            }
        }

        fetchProducts()
    }, [])

    return (
        <main className="px-4 sm:px-6 md:px-8 py-8">


            <div className="flex flex-col lg:flex-row items-start lg:items-end mx-0 md:mx-4 justify-between gap-6 lg:gap-15">

                <div>

                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut"
                        }}
                        className="relative w-fit bg-white border border-gray-400 rounded-full shadow-2xl text-black text-base sm:text-lg md:text-2xl font-medium py-2 px-7 md:px-10"
                    >
                        <Dot
                            size={35}
                            strokeWidth={1.5}
                            className="absolute left-1 mt-[-4] text-orange-600"
                        />

                        Top Rated Product

                    </motion.h3>


                    <motion.h2
                        className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-semibold text-left mt-5 leading-tight"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={containerVariants}
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
                        delay: 0.3,
                        ease: "easeOut"
                    }}
                    className="mt-0 lg:mt-10 text-base sm:text-lg md:text-xl lg:text-2xl w-full lg:w-[45%] leading-relaxed text-gray-700"
                >
                    Discover beautifully crafted furniture that transforms everyday spaces into elegant, comfortable, and welcoming homes.
                </motion.h3>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">

                {products.slice(0, 4).map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{
                            duration: 0.7,
                            delay: index * 0.15,
                            ease: "easeOut"
                        }}
                    >
                        <ProductCard product={product} />
                    </motion.div>
                ))}

            </div>

        </main>
    )
}