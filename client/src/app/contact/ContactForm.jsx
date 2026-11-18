
"use client"

import { MapPin, Mail, Headset, Clock } from "lucide-react"
import { motion, MotionConfig } from "motion/react"

const contactDetails = [
    {
        icon: MapPin,
        title: "Head Office",
        lines: ["No. 234, Ikeyi Street,", "Off Inowe Avenue, Abuja, Nigeria"],
    },
    {
        icon: Mail,
        title: "Email Support",
        lines: ["supportemail123@gmail.com"],
    },
    {
        icon: Headset,
        title: "Customer Support",
        lines: ["+234 7908 4352"],
    },
    {
        icon: Clock,
        title: "Office Hours",
        lines: ["09:00 AM – 5:00 PM", "Monday – Saturday"],
    },
]

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 25,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
}

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
}

const detailVariants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
}

const formContainer = {
    hidden: {
        opacity: 0,
        x: 45,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.12,
        },
    },
}

export default function ContactForm() {
    return (
        <MotionConfig reducedMotion="user">
            <main className="mx-6 md:mx-8 lg:mx-16 py-10 md:py-20">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >

                        <motion.span
                            variants={fadeUp}
                            className="text-xs uppercase tracking-[0.2em] text-black font-medium block"
                        >
                            Get in Touch
                        </motion.span>

                        <motion.h2
                            variants={fadeUp}
                            className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl leading-[1.1] my-5 text-black"
                        >
                            Connect with Maisonelle for{" "}
                            <span className="italic text-[#8B725F]">
                                Trusted Support.
                            </span>
                        </motion.h2>

                        <motion.p
                            variants={fadeUp}
                            className="text-sm md:text-base leading-7 text-black max-w-lg"
                        >
                            Whether you have a question about our furniture, need
                            assistance with an order, or simply want to know more
                            about Maisonelle, our team is here to help.
                        </motion.p>

                        <motion.div
                            variants={staggerContainer}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 mt-12"
                        >

                            {contactDetails.map((item) => {
                                const Icon = item.icon

                                return (
                                    <motion.div
                                        key={item.title}
                                        variants={detailVariants}
                                        className="flex items-start gap-4"
                                    >

                                        <motion.div
                                            whileHover={{
                                                y: -4,
                                                scale: 1.05,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                ease: "easeOut",
                                            }}
                                            className="w-12 h-12 shrink-0 flex items-center justify-center rounded-full bg-[#F0E9E1] text-black"
                                        >
                                            <Icon size={21} strokeWidth={1.5} />
                                        </motion.div>

                                        <div>
                                            <h3 className="text-sm font-semibold text-black mb-2">
                                                {item.title}
                                            </h3>

                                            {item.lines.map((line, index) => (
                                                <p
                                                    key={index}
                                                    className="text-xs md:text-sm leading-6 text-black"
                                                >
                                                    {line}
                                                </p>
                                            ))}
                                        </div>

                                    </motion.div>
                                )
                            })}

                        </motion.div>

                    </motion.div>

                    <motion.div
                        variants={formContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        className="bg-white p-7 md:p-9 lg:p-10 rounded-sm shadow-[0_10px_45px_rgba(0,0,0,0.12)] border border-[#EEEEEE]"
                    >

                        <motion.div variants={fadeUp} className="mb-8">

                            <h3 className="font-[family-name:var(--font-cormorant)] font-bold text-3xl md:text-4xl text-black mt-3">
                                Talk with our team about your furniture needs
                            </h3>

                        </motion.div>


                        <form className="space-y-6">

                            <motion.div
                                variants={fadeUp}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                            >
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-xs font-medium text-black mb-2"
                                    >
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Your full name"
                                        required
                                        className="w-full h-12 px-4 bg-white border border-[#E5E5E5] text-sm text-black placeholder:text-[#999999] outline-none transition-all duration-300 focus:border-black focus:ring-1 focus:ring-black"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="company"
                                        className="block text-xs font-medium text-black mb-2"
                                    >
                                        Company <span className="text-[#999999] font-normal">(Optional)</span>
                                    </label>

                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        placeholder="Company name"
                                        className="w-full h-12 px-4 bg-white border border-[#E5E5E5] text-sm text-black placeholder:text-[#999999] outline-none transition-all duration-300 focus:border-black focus:ring-1 focus:ring-black"
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                variants={fadeUp}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                            >
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-xs font-medium text-black mb-2"
                                    >
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        required
                                        className="w-full h-12 px-4 bg-white border border-[#E5E5E5] text-sm text-black placeholder:text-[#999999] outline-none transition-all duration-300 focus:border-black focus:ring-1 focus:ring-black"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-xs font-medium text-black mb-2"
                                    >
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="+234 000 000 0000"
                                        className="w-full h-12 px-4 bg-white border border-[#E5E5E5] text-sm text-black placeholder:text-[#999999] outline-none transition-all duration-300 focus:border-black focus:ring-1 focus:ring-black"
                                    />
                                </div>
                            </motion.div>

                            <motion.div variants={fadeUp}>
                                <label
                                    htmlFor="message"
                                    className="block text-xs font-medium text-black mb-2"
                                >
                                    Your Message
                                </label>

                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    placeholder="How can we help you?"
                                    required
                                    className="w-full p-4 bg-white border border-[#E5E5E5] text-sm text-black placeholder:text-[#999999] outline-none resize-none transition-all duration-300 focus:border-black focus:ring-1 focus:ring-black"
                                />
                            </motion.div>

                            <motion.div variants={fadeUp}>
                                <motion.button
                                    type="submit"
                                    whileHover={{
                                        y: -3,
                                        boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full sm:w-auto min-w-[190px] h-13 px-8 bg-[#4f270e] rounded-lg text-white text-xs uppercase tracking-[0.18em] font-medium flex items-center justify-center transition-colors duration-300 hover:bg-[#333333]"
                                >
                                    Send Message
                                </motion.button>
                            </motion.div>

                        </form>

                    </motion.div>

                </div>

            </main>
        </MotionConfig>
    )
}
