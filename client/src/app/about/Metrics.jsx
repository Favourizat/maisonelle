"use client"

import { useEffect, useRef, useState } from "react"
import { animate, useInView } from "motion/react"

const metrics = [
    { number: "1000+", label: "Products" },
    { number: "100%", label: "Quality Commitment" },
    { number: "12+", label: "Years of Experience" },
    { number: "99%", label: "Customer Satisfaction" }
]

function CountUp({ number }) {
    const ref = useRef(null)
    const isInView = useInView(ref, {
        once: true,
        amount: 0.5
    })

    const [count, setCount] = useState(0)

    const target = parseInt(number, 10)
    const suffix = number.replace(/[0-9]/g, "")

    useEffect(() => {
        if (!isInView) return

        const controls = animate(0, target, {
            duration: 2,
            ease: "easeOut",
            onUpdate: (latest) => {
                setCount(Math.floor(latest))
            }
        })

        return () => controls.stop()
    }, [isInView, target])

    return (
        <span ref={ref}>
            {count}{suffix}
        </span>
    )
}

export default function Metrics() {
    return (
        <main className="px-6 md:px-12 lg:px-20 py-16 bg-[#F7F3EE]">
            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x-0 lg:divide-x lg:divide-[#D9CEC3]">

                {metrics.map((metric) => (
                    <div
                        key={metric.label}
                        className="flex flex-col items-center justify-center text-center px-4 py-8 lg:py-4"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif text-[#6F4E37]">
                            <CountUp number={metric.number} />
                        </h2>

                        <p className="mt-3 text-sm md:text-base text-[#65574D] font-medium">
                            {metric.label}
                        </p>

                        <div className="w-8 h-[2px] bg-[#A88B73] mt-5 lg:hidden" />
                    </div>
                ))}

            </div>
        </main>
    )
}