"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Dot, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, useAnimationControls, useReducedMotion } from "motion/react"
import Image from "next/image"
import Link from "next/link"

const categories = [
    { name: "Living Room", slug: "living-room", image: "/Hero1.jpg" },
    { name: "Bedroom", slug: "bedroom", image: "/bedroom1.jpg" },
    { name: "Dining Room", slug: "dining-room", image: "/dining1.jpg" },
    { name: "Kitchen", slug: "kitchen", image: "/kitchen1.jpg" },
    { name: "Office", slug: "office", image: "/office1.jpg" },
    { name: "Lounge", slug: "lounge", image: "/outdoor1.jpg" },
    { name: "Home Storage", slug: "home-storage", image: "/storage1.jpg" },
]

const duplicatedCategories = [...categories, ...categories]

const CARD_STEP = 192

const headingVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.025,
        },
    },
}

const letterVariants = {
    hidden: {
        opacity: 0,
        y: 30,
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

export default function Shopbycategory() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    const controls = useAnimationControls()
    const reduceMotion = useReducedMotion()
    const isAnimating = useRef(false)

    const moveCarousel = useCallback(async (direction) => {
        if (isAnimating.current) return

        isAnimating.current = true

        const transition = reduceMotion
            ? { duration: 0 }
            : {
                duration: 0.8,
                ease: "easeInOut",
            }

        try {
            if (direction === 1) {
                if (currentIndex === categories.length - 1) {
                    await controls.start({
                        x: -categories.length * CARD_STEP,
                        transition,
                    })
                    controls.set({ x: 0 })
                    setCurrentIndex(0)
                } else {
                    const nextIndex = currentIndex + 1

                    await controls.start({
                        x: -nextIndex * CARD_STEP,
                        transition,
                    })

                    setCurrentIndex(nextIndex)
                }
            } else {
                if (currentIndex === 0) {
                    controls.set({
                        x: -categories.length * CARD_STEP,
                    })

                    await controls.start({
                        x: -(categories.length - 1) * CARD_STEP,
                        transition,
                    })

                    setCurrentIndex(categories.length - 1)
                } else {
                    const previousIndex = currentIndex - 1

                    await controls.start({
                        x: -previousIndex * CARD_STEP,
                        transition,
                    })

                    setCurrentIndex(previousIndex)
                }
            }
        } finally {
            isAnimating.current = false
        }
    }, [controls, currentIndex, reduceMotion])

    useEffect(() => {
        if (isPaused || reduceMotion) return

        const timeout = setTimeout(() => {
            moveCarousel(1)
        }, 3500)

        return () => clearTimeout(timeout)
    }, [currentIndex, isPaused, reduceMotion, moveCarousel])

    const handleBlur = (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsPaused(false)
        }
    }

    return (
        <main className="px-5 md:px-8 py-12 md:py-18 mx-auto max-w-[1600px]">
            <div className="flex items-center justify-center mx-4">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                        duration: 0.7,
                        ease: "easeOut",
                    }}
                    className="relative w-fit bg-white border border-gray-300 rounded-full shadow-lg text-black text-xl md:text-2xl font-medium py-2 px-10"
                >
                    <Dot
                        size={35}
                        strokeWidth={1.5}
                        className="absolute left-2 text-orange-600"
                    />
                    Shop By Category
                </motion.h3>
            </div>

            <motion.h2
                className="my-7 md:my-9 text-center text-4xl md:text-5xl lg:text-6xl font-semibold font-[var(--font-cormorant)] text-[#3A2A22]"
                variants={headingVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
            >
                {"Explore Furniture Categories".split("").map((letter, index) => (
                    <motion.span
                        key={index}
                        variants={letterVariants}
                        className="inline-block"
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                ))}
            </motion.h2>

            <div className="flex justify-end items-center gap-3 mx-2 md:mx-4 mb-2">

                <button
                    type="button"
                    onClick={() => moveCarousel(-1)}
                    aria-label="Previous categories"
                    className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-300 text-[#3A2A22] hover:bg-[#6F4E37] hover:text-white hover:border-[#6F4E37] transition-all duration-300"
                >
                    <ChevronLeft size={21} strokeWidth={1.7} />
                </button>

                <button
                    type="button"
                    onClick={() => moveCarousel(1)}
                    aria-label="Next categories"
                    className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-300 text-[#3A2A22] hover:bg-[#6F4E37] hover:text-white hover:border-[#6F4E37] transition-all duration-300"
                >
                    <ChevronRight size={21} strokeWidth={1.7} />
                </button>

            </div>

            <motion.div
                className="overflow-hidden"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut",
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onFocusCapture={() => setIsPaused(true)}
                onBlurCapture={handleBlur}
            >
                <motion.div
                    className="flex gap-8 w-max py-5"
                    animate={controls}
                    initial={{ x: 0 }}
                >
                    {duplicatedCategories.map((category, index) => (
                        <motion.div
                            key={`${category.slug}-${index}`}
                            initial={{ opacity: 0, y: 35 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.7,
                                delay: (index % categories.length) * 0.07,
                                ease: "easeOut",
                            }}
                            className="w-40 shrink-0"
                        >
                            <Link
                                href={`/products?category=${category.slug}`}
                                aria-label={`Explore ${category.name} furniture`}
                                className="group flex flex-col items-center"
                            >
                                <div className="relative w-40 h-40 rounded-full overflow-hidden border border-gray-200 shadow-md transition-all duration-500 group-hover:shadow-xl group-hover:border-[#6F4E37]">

                                    <Image
                                        src={category.image}
                                        alt={`${category.name} furniture`}
                                        fill
                                        sizes="160px"
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    />

                                </div>

                                <div className="relative mt-5">
                                    <p className="text-lg md:text-xl text-center font-medium text-gray-800 transition-colors duration-300 group-hover:text-[#6F4E37]">
                                        {category.name}
                                    </p>

                                    <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-[#6F4E37] transition-all duration-300 group-hover:w-full group-hover:left-0" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            <div className="flex justify-center items-center gap-2 mt-7">
                {categories.map((category, index) => (
                    <button
                        key={category.slug}
                        type="button"
                        onClick={async () => {
                            if (isAnimating.current) return

                            isAnimating.current = true

                            try {
                                const transition = reduceMotion
                                    ? { duration: 0 }
                                    : {
                                        duration: 0.7,
                                        ease: "easeInOut",
                                    }

                                await controls.start({
                                    x: -index * CARD_STEP,
                                    transition,
                                })

                                setCurrentIndex(index)
                            } finally {
                                isAnimating.current = false
                            }
                        }}
                        aria-label={`Go to ${category.name}`}
                        aria-current={currentIndex === index ? "true" : undefined}
                        className="p-1"
                    >
                        <motion.span
                            animate={{
                                width: currentIndex === index ? 28 : 9,
                                backgroundColor:
                                    currentIndex === index ? "#6F4E37" : "#D6D3D1",
                            }}
                            transition={{
                                duration: 0.4,
                                ease: "easeInOut",
                            }}
                            className="block h-2 rounded-full"
                        />
                    </button>
                ))}
            </div>

        </main>
    )
}