
"use client"

import { useEffect, useState } from "react"
import { Dot, Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence, MotionConfig } from "motion/react"
import { reviews } from "@/data/products"

export default function Reviews() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(1)
    const [isPaused, setIsPaused] = useState(false)

    const currentReview = reviews[currentIndex]

    const changeReview = (newIndex, moveDirection) => {
        if (newIndex === currentIndex || newIndex < 0 || newIndex >= reviews.length) return

        setDirection(moveDirection)
        setCurrentIndex(newIndex)
    }

    const nextReview = () => {
        changeReview((currentIndex + 1) % reviews.length, 1)
    }

    const previousReview = () => {
        changeReview(
            (currentIndex - 1 + reviews.length) % reviews.length,
            -1
        )
    }

    useEffect(() => {
        if (isPaused || reviews.length <= 1) return

        const interval = setInterval(() => {
            setDirection(1)
            setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [isPaused])

    const handleBlur = (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsPaused(false)
        }
    }

    if (!currentReview) return null

    const reviewVariants = {
        enter: (direction) => ({
            x: direction * 70,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            x: direction * -70,
            opacity: 0,
        }),
    }

    return (
        <MotionConfig reducedMotion="user">
            <main className="bg-[#F7F2E8] py-14 md:py-20 overflow-hidden">

                <div className="mx-auto max-w-[1600px] px-5 md:px-10">

                    <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14 lg:gap-20">

                        <motion.div
                            initial={{ opacity: 0, x: -70 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: 1,
                                ease: "easeOut",
                            }}
                            className="relative w-full md:w-1/2 h-[420px] md:h-[580px] lg:h-[680px] overflow-hidden rounded-4xl group"
                        >
                            <motion.div
                                className="absolute inset-0"
                                whileHover={{ scale: 1.04 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <Image
                                    src="/outdoorfurniture.jpg"
                                    alt="Elegant outdoor furniture and living space"
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                />
                            </motion.div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                        </motion.div>

                        <div
                            className="w-full md:w-1/2 py-4 md:py-6"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                            onFocusCapture={() => setIsPaused(true)}
                            onBlurCapture={handleBlur}
                        >

                            <motion.div
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                className="flex items-center mb-7 mx-1 md:mx-0"
                            >
                                <h3 className="relative w-fit border border-gray-400 rounded-full shadow-md bg-white text-black text-xl md:text-2xl font-medium py-2 px-10">
                                    <Dot
                                        size={35}
                                        strokeWidth={1.5}
                                        className="absolute left-2 text-orange-600"
                                    />
                                    Happy Customer
                                </h3>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 35 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.15,
                                    ease: "easeOut",
                                }}
                                className="font-[var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl leading-tight font-semibold text-[#3A2A22] mx-1 md:mx-0"
                            >
                                Beautiful Furniture
                                <span className="block">Trusted By Modern Families</span>
                            </motion.h1>

                            <div className="mt-12 md:mt-14 mx-1 md:mx-0">

                                <AnimatePresence mode="wait" custom={direction}>

                                    <motion.div
                                        key={currentReview.id}
                                        custom={direction}
                                        variants={reviewVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{
                                            duration: 0.75,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                    >
                                        <Quote
                                            size={42}
                                            strokeWidth={1.3}
                                            className="text-[#6F4E37] mb-5"
                                        />

                                        <div
                                            className="flex items-center gap-1 mb-6"
                                            aria-label="5 out of 5 stars"
                                        >
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    size={23}
                                                    fill="#6F4E37"
                                                    stroke="#6F4E37"
                                                />
                                            ))}
                                        </div>

                                        <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-[#3A2A22] font-medium">
                                            “{currentReview.text}”
                                        </p>

                                        <div className="flex items-center gap-5 mt-9">

                                            <div className="relative w-[75px] h-[75px] md:w-[90px] md:h-[90px] shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md">
                                                <Image
                                                    src={currentReview.image}
                                                    alt={currentReview.name}
                                                    fill
                                                    sizes="90px"
                                                    className="object-cover"
                                                />
                                            </div>

                                            <div>
                                                <h3 className="text-xl md:text-2xl text-[#3A2A22] font-semibold">
                                                    {currentReview.name}
                                                </h3>

                                                <p className="text-base md:text-lg text-gray-600 mt-1">
                                                    {currentReview.role}
                                                </p>
                                            </div>

                                        </div>

                                    </motion.div>

                                </AnimatePresence>

                            </div>

                            <motion.hr
                                initial={{ opacity: 0, scaleX: 0 }}
                                whileInView={{ opacity: 1, scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                style={{ transformOrigin: "left" }}
                                className="border-gray-300 my-9 md:my-10"
                            />

                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    {reviews.map((review, index) => (
                                        <button
                                            key={review.id}
                                            type="button"
                                            onClick={() => changeReview(index, index > currentIndex ? 1 : -1)}
                                            aria-label={`View review ${index + 1}`}
                                            aria-current={currentIndex === index ? "true" : undefined}
                                            className="p-1"
                                        >
                                            <motion.span
                                                animate={{
                                                    width: currentIndex === index ? 28 : 9,
                                                    backgroundColor:
                                                        currentIndex === index
                                                            ? "#6F4E37"
                                                            : "#D6D3D1",
                                                }}
                                                transition={{
                                                    duration: 0.35,
                                                    ease: "easeInOut",
                                                }}
                                                className="block h-2 rounded-full"
                                            />
                                        </button>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4">

                                    <p className="text-sm text-gray-600 tabular-nums">
                                        <span className="text-[#6F4E37] font-semibold">
                                            {String(currentIndex + 1).padStart(2, "0")}
                                        </span>
                                        {" / "}
                                        {String(reviews.length).padStart(2, "0")}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={previousReview}
                                        aria-label="Previous review"
                                        className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-400 text-[#3A2A22] hover:bg-[#6F4E37] hover:text-white hover:border-[#6F4E37] transition-all duration-300"
                                    >
                                        <ChevronLeft size={21} strokeWidth={1.7} />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={nextReview}
                                        aria-label="Next review"
                                        className="w-11 h-11 flex items-center justify-center rounded-full bg-[#6F4E37] text-white border border-[#6F4E37] hover:bg-[#3A2A22] hover:border-[#3A2A22] transition-all duration-300"
                                    >
                                        <ChevronRight size={21} strokeWidth={1.7} />
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </main>
        </MotionConfig>
    )
}
