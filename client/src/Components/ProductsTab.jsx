"use client"

import { useState } from "react"


export default function ProductsTab({ product }) {
    const [activeTab, setActiveTab] = useState("description")

    return (
        <main>
            <div className="flex gap-6 mx-8 mt-10 md:mt-14 text-2xl font-semibold">
                <button onClick={() => setActiveTab("description")}
                    className={`pb-2 cursor-pointer ${activeTab === "description"
                        ? "border-b-2 border-[#6F4E37]"
                        : "border-b-2 border-transparent"
                        }`}
                >
                    Description
                </button>

                <button onClick={() => setActiveTab("dimensions")}
                    className={`pb-2 cursor-pointer ${activeTab === "dimensions"
                        ? "border-b-2 border-[#6F4E37]"
                        : "border-b-2 border-transparent"
                        }`}
                >
                    Dimensions
                </button>


            </div>

            <div className="mx-8 my-6 md:my-6">
                {activeTab === "description" ? (
                    <div>
                        <h2 className="text-xl">
                            {product.main1}
                        </h2>
                        <h2 className="text-xl mt-4">{product.main2}</h2>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl">{product.dimensions}</h2>
                    </div>
                )}
            </div>
        </main>
    )
}