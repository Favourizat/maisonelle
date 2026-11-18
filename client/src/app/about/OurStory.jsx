"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import { motion, MotionConfig } from "motion/react"

const features = [
    "Premium Quality",
    "Timeless Designs",
    "Expert Craftsmanship",
    "Customer Satisfaction"
]

export default function OurStory() {
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

    const imageVariants = {
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

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.10
            }
        }
    }

    return (

        <MotionConfig reducedMotion="user">
            <main className="px-6 md:px-12 lg:px-20 py-20 mt-10 bg-[#FAF8F5]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center max-w-7xl mx-auto">
                    <div className="relative min-h-[480px] md:min-h-[550px]">

                        <motion.div
                            variants={imageVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="absolute left-0 top-0 w-[78%] h-[430px] md:h-[500px] overflow-hidden"
                        >
                            <Image
                                src="/outdoorfurniture.jpg"
                                alt="Beautifully designed outdoor furniture"
                                fill
                                priority
                                sizes="(max-width: 768px) 78vw, 40vw"
                                className="object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </motion.div>

                        <motion.div
                            variants={imageVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: 0.2 }}
                            className="absolute right-0 bottom-0 w-[48%] h-[260px] md:h-[320px] overflow-hidden border-[10px] border-[#FAF8F5] shadow-xl"
                        >
                            <Image
                                src="/outdoorfurniture.jpg"
                                alt="Elegant furniture craftsmanship"
                                fill
                                sizes="(max-width: 768px) 48vw, 25vw"
                                className="object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: 0.35 }}
                            className="absolute left-0 bottom-0 bg-[#6F4E37] text-white px-6 py-4 shadow-lg"
                        >
                            <p className="text-2xl font-serif">Since 2015</p>
                            <p className="text-xs tracking-[0.2em] uppercase mt-1 text-white/80">
                                A tradition of elegance
                            </p>
                        </motion.div>
                    </div>

                    <div className="py-6">

                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="text-[#9A765C] uppercase tracking-[0.3em] text-xs font-semibold mb-5"
                        >
                            Our Story
                        </motion.p>

                        <motion.h2
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: 0.15 }}
                            className="text-4xl md:text-5xl font-serif leading-[1.2] text-[#30251F]"
                        >
                            Timeless Craft,
                            <span className="block italic text-[#8A654C]">
                                Classic Designs
                            </span>
                            With True Elegance.
                        </motion.h2>

                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: 0.25 }}
                            className="mt-7 text-gray-600 leading-8 text-base md:text-lg"
                        >
                            Thoughtfully crafted furniture that blends timeless
                            elegance with classic design, bringing lasting beauty
                            and character to every living space.
                        </motion.p>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mt-9"
                        >
                            {features.map((feature) => (
                                <motion.div
                                    key={feature}
                                    variants={fadeUp}
                                    className="flex items-center gap-3 group"
                                >
                                    <div className="shrink-0 w-7 h-7 rounded-full bg-[#6F4E37] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                        <Check
                                            size={15}
                                            strokeWidth={2.5}
                                            className="text-white"
                                        />
                                    </div>

                                    <span className="text-[#40332B] font-medium text-sm md:text-base transition-colors duration-300 group-hover:text-[#9A765C]">
                                        {feature}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            whileInView={{ scaleX: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.8,
                                delay: 0.3,
                                ease: "easeOut"
                            }}
                            style={{ transformOrigin: "left" }}
                            className="w-full h-px bg-[#DED5CC] my-10"
                        />

                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center justify-between gap-5"
                        >
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#D9C8B8]">
                                    <Image
                                        src="/CEO.jpg"
                                        alt="James Wellington"
                                        fill
                                        sizes="64px"
                                        className="object-cover"
                                    />
                                </div>

                                <div>
                                    <h3 className="font-serif text-xl text-[#30251F]">
                                        James Wellington
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        CEO & Founder
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </main>
        </MotionConfig>

    )
}