
"use client"

import Image from "next/image"
import { Star, Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useWishlist } from "@/context/WishlistContext"
import { useCart } from "@/context/CartContext"
import { useState } from "react"

const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price)
}

export default function ProductCard({ product }) {
    const { addToCart } = useCart()
    const [added, setAdded] = useState(false)

    const { toggleWishlist, isInWishlist } = useWishlist()

    const saved = isInWishlist(product.id)

    const originalPrice = Number(product.price)
    const discount = Number(product.discount || 0)

    const hasDiscount =
        Number.isFinite(originalPrice) &&
        Number.isFinite(discount) &&
        discount > 0 &&
        discount < 100

    const discountedPrice = hasDiscount
        ? originalPrice - (originalPrice * discount / 100)
        : originalPrice

    function handleAddToCart() {
        addToCart(product)

        setAdded(true)

        setTimeout(() => {
            setAdded(false)
        }, 2000)
    }

    return (
        <div className="w-full min-w-0">

            <div className="group relative w-full h-[280px] sm:h-[350px] lg:h-[416px] cursor-pointer">

                <Link href={`/products/${product.slug}`}>
                    <div className="relative w-full h-104">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover border border-gray-400 rounded-3xl"
                        />
                    </div>
                </Link>

                {hasDiscount && (
                    <div className="absolute top-4 right-4 z-10 bg-[#6F4E37] text-white text-xs sm:text-sm font-semibold px-3 py-2 rounded-full shadow-md">
                        -{discount}% OFF
                    </div>
                )}

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center text-white gap-6">

                    <button
                        type="button"
                        onClick={() => toggleWishlist(product)}
                        className="cursor-pointer"
                    >
                        <Heart
                            size={55}
                            strokeWidth={1.8}
                            fill={saved ? "#6F4E37" : "none"}
                            className="border border-gray-200 bg-white py-3 rounded-full text-black hover:bg-black hover:text-white"
                        />
                    </button>

                    <button
                        type="button"
                        onClick={handleAddToCart}
                        className={`w-[55px] h-[55px] flex items-center justify-center border rounded-full transition-all duration-300 cursor-pointer
                            ${added
                                ? "bg-[#6F4E37] border-[#6F4E37]"
                                : "bg-white border-gray-200 hover:bg-gray-400"
                            }`}
                    >
                        <ShoppingCart
                            size={25}
                            strokeWidth={1.8}
                            color={added ? "#FFFFFF" : "#000000"}
                            className={!added ? "group-hover:text-white" : ""}
                        />
                    </button>

                </div>
            </div>

            <Link href={`/products/${product.slug}`}>
                <div className="mt-7">

                    <h2 className="text-base sm:text-xl md:text-2xl font-bold">
                        {product.name}
                    </h2>

                    <div className="mt-3 mb-4 flex gap-1 text-gray-400">

                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={25}
                                fill={star <= 4 ? "#6F4E37" : "none"}
                                stroke="#6F4E37"
                            />
                        ))}

                        <p className="text-xl text-black">
                            ({product.Qty})
                        </p>

                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">

                        {hasDiscount ? (
                            <>
                                <span className="text-lg sm:text-xl font-bold text-[#6F4E37]">
                                    {formatPrice(discountedPrice)}
                                </span>

                                <span className="text-sm sm:text-base text-gray-400 line-through">
                                    {formatPrice(originalPrice)}
                                </span>
                            </>
                        ) : (
                            <span className="text-lg sm:text-xl font-bold">
                                {formatPrice(originalPrice)}
                            </span>
                        )}

                    </div>

                </div>
            </Link>

        </div>
    )
}
