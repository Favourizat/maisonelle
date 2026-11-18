"use client"

import { Dot } from "lucide-react"
import Image from "next/image"
import { Teams } from "@/data/products"
import { motion, MotionConfig } from "motion/react"

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 30
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: "easeOut"
        }
    }
}

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.18
        }
    }
}

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 40
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

export default function OurTeam() {
    return (
        <MotionConfig reducedMotion="user">
            <main className="py-20 px-6 md:px-10 lg:px-16 overflow-hidden">
                <div className="max-w-7xl mx-auto">

                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="flex items-center justify-center mb-10"
                    >
                        <h3 className="relative w-fit bg-white border border-gray-400 rounded-full shadow-lg text-black text-2xl font-medium py-2 px-10">
                            <Dot
                                size={35}
                                strokeWidth={1.5}
                                className="absolute left-2 text-orange-600"
                            />
                            Our Team
                        </h3>
                    </motion.div>

                    <motion.h4
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={fadeUp}
                        className="text-2xl md:text-4xl font-bold flex text-center justify-center mb-12"
                    >
                        Great Minds Behind Maisonelle
                    </motion.h4>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6"
                    >
                        {Teams.map((team) => (
                            <motion.div
                                key={team.id}
                                variants={cardVariants}
                                className="relative w-full h-[450px] overflow-hidden rounded-xl group"
                            >
                                <motion.div
                                    className="absolute inset-0"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{
                                        duration: 0.8,
                                        ease: "easeOut"
                                    }}
                                >
                                    <Image
                                        src={team.image}
                                        alt={team.name}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                        className="object-cover"
                                    />
                                </motion.div>

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                <motion.div
                                    variants={fadeUp}
                                    className="absolute bottom-0 left-0 right-0 z-20 p-5 md:p-6 text-white"
                                >
                                    <h2 className="font-bold text-xl md:text-2xl">
                                        {team.name}
                                    </h2>

                                    <p className="font-medium text-sm md:text-lg text-white/80 mt-1">
                                        {team.role}
                                    </p>

                                    <div className="w-8 h-[2px] bg-[#C3A68D] mt-3 transition-all duration-500 group-hover:w-14" />
                                </motion.div>

                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </main>
        </MotionConfig>
    )
}