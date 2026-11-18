
import Image from "next/image"
import { House } from "lucide-react"

export default function OurCeo() {
    return (
        <main className="px-6 py-20 my-30">
            <div className="grid grid-cols-2 gap-9">

                <div className="relative min-h-[700px] overflow-hidden">
                    <Image
                        src="/CEO.jpg"
                        alt="delivery image"
                        fill
                        className="object-cover rounded-3xl" />
                </div>

                <div className="py-10">
                    <h3 className="text-black text-3xl font-bold mb-2">Meet Our CEO</h3>

                    <p className="text-black py-5">

                        With a background in business, design, and a deep appreciation for beautiful living spaces, our CEO has always believed that the right environment can transform the way people feel and live. Over the years, this interest grew into a vision to make thoughtfully designed, quality furniture and home essentials more accessible.

                        That vision became Maisonelle.
                        <br />
                        <br />

                        Maisonelle was founded on the belief that a home should be more than just a place to live. It should be a reflection of personality, comfort, and individual style. Recognizing the need for furniture that combines elegance, functionality, and quality, our CEO set out to build a brand that makes creating beautiful spaces a more enjoyable and accessible experience.

                        Today, that vision continues to guide Maisonelle. Through careful curation, attention to detail, and a commitment to customer satisfaction, we strive to help people create spaces they are proud to call home.
                            <br />
                            <br />
                        My vision for Maisonelle has always been simple: to help people create beautiful spaces where comfort meets style, and every detail feels like home."
                            <br />
                        — Founder & CEO, Maisonelle

                    </p>

                    

                </div>

            </div>
        </main>
    )
}