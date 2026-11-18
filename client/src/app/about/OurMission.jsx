"use client"

import Image from "next/image"
import { House, Gem, HeartHandshake, Truck, ArrowUpRight } from "lucide-react"
import { motion, MotionConfig } from "motion/react"

const values = [
    { icon: Gem, title: "Quality Craftsmanship" },
    { icon: House, title: "Timeless Design" },
    { icon: HeartHandshake, title: "Customer First" },
    { icon: Truck, title: "Reliable Delivery" }
]

export default function OurMission() {

    const fadeUp = {
        hidden: {
            opacity: 0,
            y: 30
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    }

    const staggerContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.10
            }
        }
    }

    return (
        <MotionConfig reducedMotion="user">
            <main className="px-6 md:px-10 lg:px-16 py-16 mt-10">

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch max-w-[1600px] mx-auto">

                    <motion.div
                        initial={{ opacity: 0, y: 35 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut"
                        }}
                        className="relative bg-[#30221B] text-white overflow-hidden shadow-xl"
                    >

                        <div className="absolute top-0 right-0 w-40 h-40 border-t border-r border-[#A88B73]/30 m-5 pointer-events-none" />

                        <div className="relative z-10 p-7 md:p-10 lg:p-12 xl:p-14">

                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                className="mb-8"
                            >
                                <motion.p
                                    variants={fadeUp}
                                    className="text-[#C3A68D] uppercase tracking-[0.35em] text-xs font-medium mb-5"
                                >
                                    What We Believe
                                </motion.p>

                                <motion.h2
                                    variants={fadeUp}
                                    className="text-4xl md:text-5xl font-serif text-[#F7F1E9] leading-tight"
                                >
                                    Our
                                    <span className="italic text-[#C3A68D]"> Mission.</span>
                                </motion.h2>

                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.6,
                                        delay: 0.35,
                                        ease: "easeOut"
                                    }}
                                    style={{ transformOrigin: "left" }}
                                    className="w-16 h-[2px] bg-[#A88B73] mt-6"
                                />
                            </motion.div>

                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                className="space-y-5 text-[#E5DAD0] text-sm md:text-base leading-8"
                            >
                                <motion.p variants={fadeUp}>
                                    At Maisonelle, our mission is to make beautiful,
                                    comfortable, and thoughtfully designed living
                                    spaces accessible to everyone. We believe furniture
                                    is more than something that fills a room; it shapes
                                    how we live, relax, connect, and create lasting memories.
                                </motion.p>

                                <motion.p variants={fadeUp}>
                                    Through carefully curated furniture and home décor,
                                    we bring together quality craftsmanship, timeless
                                    design, and everyday functionality. Our goal is to
                                    help every customer create a home that reflects
                                    their personality and inspires comfort.
                                </motion.p>
                            </motion.div>

                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                className="grid grid-cols-2 gap-x-5 gap-y-7 mt-10 pt-8 border-t border-white/15"
                            >
                                {values.map((item) => {
                                    const Icon = item.icon

                                    return (
                                        <motion.div
                                            key={item.title}
                                            variants={fadeUp}
                                            className="flex items-center gap-3 group"
                                        >
                                            <div className="shrink-0 w-10 h-10 rounded-full border border-[#A88B73]/50 flex items-center justify-center text-[#C3A68D] transition-all duration-300 group-hover:bg-[#A88B73]/15 group-hover:border-[#C3A68D] group-hover:scale-110">
                                                <Icon
                                                    size={19}
                                                    strokeWidth={1.4}
                                                    className="transition-transform duration-300 group-hover:-translate-y-0.5"
                                                />
                                            </div>

                                            <span className="text-[#F7F1E9] text-xs md:text-sm font-medium leading-5 transition-colors duration-300 group-hover:text-[#C3A68D]">
                                                {item.title}
                                            </span>
                                        </motion.div>
                                    )
                                })}
                            </motion.div>

                            <motion.div
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                className="mt-10 flex items-center justify-between"
                            >
                                <p className="text-[#C3A68D] text-xs tracking-[0.2em] uppercase">
                                    Designed for Living
                                </p>

                                <motion.div
                                    whileHover={{ x: 4, y: -4 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ArrowUpRight
                                        size={20}
                                        className="text-[#C3A68D]"
                                    />
                                </motion.div>
                            </motion.div>

                        </div>
                    </motion.div>

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.96
                        }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            duration: 1,
                            ease: "easeOut"
                        }}
                        className="relative min-h-[450px] lg:min-h-full overflow-hidden group"
                    >

                        <Image
                            src="/AboutImage1.jpg"
                            alt="Elegant Maisonelle living room interior"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#211710]/65 via-transparent to-transparent" />

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 30
                            }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.4,
                                ease: "easeOut"
                            }}
                            className="absolute bottom-0 left-0 p-8 md:p-10 lg:p-12"
                        >
                            <p className="text-[#E4C6A8] uppercase tracking-[0.3em] text-xs mb-3">
                                The Maisonelle Philosophy
                            </p>

                            <h3 className="text-white font-serif text-3xl md:text-4xl leading-tight max-w-md">
                                A Beautiful Home Begins With Thoughtful Choices.
                            </h3>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.8,
                                delay: 0.6
                            }}
                            className="absolute inset-5 border border-white/30 pointer-events-none"
                        />

                    </motion.div>

                </section>
            </main>
        </MotionConfig>
    )
}