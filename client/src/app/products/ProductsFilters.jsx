"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/Components/ProductCard"
import { Star } from "lucide-react"

export default function ProductsFilter({ products, initialCategory = "ALL" }) {

    const [selectedCategory, setSelectedCategory] = useState(initialCategory)
    const [selectedRatings, setSelectedRatings] = useState([])

    useEffect(() => {
        setSelectedCategory(initialCategory)
    }, [initialCategory])

    let filteredProducts = [...products]

    function handleRatingChange(rating) {
        setSelectedRatings((prev) => prev.includes(rating) ? prev.filter((item) => item !== rating)
            : [...prev, rating])
    }

    if (selectedRatings.length > 0) {
        filteredProducts = filteredProducts.filter(
            (product) => selectedRatings.includes(product.rating)
        )
    }

    const categories = [
        "ALL",
        "Living Room",
        "Bedroom",
        "Dining Room",
        "Kitchen",
        "Office",
        "Lounge",
        "Home Storage"
    ]

    if (selectedCategory !== "ALL") {
        filteredProducts = filteredProducts.filter(
            (product) => product.category === selectedCategory
        )
    }

    const [selectedPrice, setSelectedPrice] = useState("ALL")
    const [sortBy, setSortBy] = useState("DEFAULT")


    if (selectedPrice === "UNDER_100") {
        filteredProducts = filteredProducts.filter(
            (product) => product.price <= 100
        )
    }

    if (selectedPrice === "UNDER_500") {
        filteredProducts = filteredProducts.filter(
            (product) => product.price <= 500
        )
    }

    if (selectedPrice === "UNDER_1000") {
        filteredProducts = filteredProducts.filter(
            (product) => product.price <= 1000
        )
    }

    if (selectedPrice === "OVER_1000") {
        filteredProducts = filteredProducts.filter(
            (product) => product.price > 1000
        )
    }

    if (sortBy === "PRICE_LOW") {
        filteredProducts = filteredProducts.sort(
            (a, b) => a.price - b.price
        )
    }

    if (sortBy === "PRICE_HIGH") {
        filteredProducts = filteredProducts.sort(
            (a, b) => b.price - a.price
        )
    }

    function clearFilters() {
        setSelectedPrice("ALL")
        setSortBy("DEFAULT")
        setSelectedRatings([])
    }

    const filtersAreActive =
        selectedPrice !== "ALL" ||
        sortBy !== "DEFAULT" ||
        selectedRatings.length > 0

    return (
        <main className="grid items-start grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
            <aside className="">
                <div>
                    <h3 className="text-xl my-6 font-semibold">
                        Product Rating
                    </h3>
                </div>

                <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => {

                        const isSelected = selectedRatings.includes(rating)

                        return (
                            <button
                                key={rating}
                                onClick={() => handleRatingChange(rating)}
                                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition 
                                    
                                    `}
                            >

                                <div className="flex items-center gap-2">

                                    <span
                                        className={`w-4 h-4 rounded-full border flex items-center justify-center 
                                        ${isSelected ? "border-[#6F4E37]" : "border-gray-400"}`}
                                    >
                                        {isSelected && (
                                            <span className="w-2 h-2 rounded-full bg-[#6F4E37]" />
                                        )}
                                    </span>

                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <Star
                                            key={index}
                                            size={20}
                                            className={
                                                index < rating
                                                    ? "fill-[#D99A32] text-[#D99A32]"
                                                    : "text-gray-300"
                                            } />
                                    ))}
                                </div>
                            </button>
                        )
                    })}
                </div>

                <div className="space-y-3 flex inline-flex p-3 mt-6">
                    <h2 className="text-xl font-semibold text-[#3A2A22]">
                        Categories
                    </h2>

                </div>

                <div className="mt-4 space-y-2 flex flex-col items-start">
                    {categories.map((category) => {
                        const isChosen = selectedCategory === category

                        return (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={` rounded-lg px-4 py-3 text-left text-sm transition`}
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`w-4 h-4 rounded-full border flex items-center justify-center
                                    ${isChosen ? "border-[#6F4E37]" : "border-gray-400"}`}
                                    >
                                        {isChosen && (
                                            <span className="w-2 h-2 rounded-full bg-[#6F4E37]" />
                                        )}
                                    </span>
                                    {category}
                                </div>
                            </button>
                        )
                    })}
                </div>
            </aside>

            <div className="min-w-0">
                <div className="py-10 md:py-15 flex justify-between">
                    <h2 className={`text-40px p-1 font-semibold border border-gray-400 bg-[#6F4E37] w-30 text-center text-white rounded-full cursor-pointer 
                        ${selectedCategory === "ALL" ? "w-40" : "w-50"}`}>
                        {selectedCategory === "ALL"
                            ? "ALL PRODUCTS"
                            : selectedCategory}
                    </h2>

                    <div className="flex flex-nowrap items-center gap-10 border border-gray-50">
                        <select
                            id="price"
                            value={selectedPrice}
                            onChange={(e) => setSelectedPrice(e.target.value)}
                            className="text-base w-50 text-black border border-gray-400 rounded-3xl bg-gray-50"
                        >
                            <option value={"ALL"}>All Prices</option>
                            <option value={"UNDER_100"}>Under 100</option>
                            <option value={"UNDER_500"}>Under 500</option>
                            <option value={"UNDER_1000"}>Under 1000</option>
                            <option value={"OVER_1000"}>Over 1000</option>
                        </select>

                        <select
                            id="sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="text-base w-50 text-black border border-gray-400 rounded-3xl bg-gray-50"
                        >
                            <option value={"DEFAULT"}>Sort By</option>
                            <option value={"PRICE_LOW"}>Price: Low to High</option>
                            <option value={"PRICE_HIGH"}>Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </main>
    )
}