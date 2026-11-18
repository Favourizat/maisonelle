import Image from "next/image"
import { House } from "lucide-react"


export default function OurVision() {
    return (
        <main className="px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-2/3 ml-auto bg-[#3A2A22] rounded-3xl overflow-hidden shadow-xl">

                <div className="relative h-[200px] md:h-[500px] min-h-[300px] w-full">
                    <Image
                        src="/flashsale4.jpg"
                        alt="delivery image"
                        fill
                        className="object-cover rounded-3xl" />
                </div>

                <div className="p-6 md:p-8 lg:p-10">
                    <h3 className="text-white text-3xl font-bold mb-2">Our Mission</h3>

                    <p className="text-white py-5">
                        At Maisonelle, our mission is to make beautiful, comfortable, and thoughtfully designed living spaces accessible to everyone. We believe that furniture is more than just something that fills a room; it shapes how we live, relax, connect, and create lasting memories.
                        Through carefully curated furniture and home décor, we bring together quality craftsmanship, timeless design, and everyday functionality. Our goal is to help every customer create a home that reflects their personality, inspires comfort, and makes every moment feel special.
                    </p>

                    <div className="grid grid-cols-2 gap-6 mt-10">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center flex h-12 w-12 items-center justify-center rounded-full bg-white">
                                <House size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-white text-xl flex flex-col items-center justify-center">
                                Quality Craftmanship
                            </h3>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center flex h-12 w-12 justify-center rounded-full bg-white">
                                <House size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-white text-xl flex flex-col items-center justify-center">
                                Timeless Design
                            </h3>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 py-6">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center h-12 w-12 justify-center rounded-full bg-white">
                                <House size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-white text-xl flex flex-col items-center justify-center">
                                Customer First
                            </h3>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center h-12 w-12 justify-center rounded-full bg-white">
                                <House size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-white text-xl flex flex-col items-center justify-center">
                                Quality Delivery
                            </h3>
                        </div>
                    </div>

                </div>

            </div>
        </main>
    )
}