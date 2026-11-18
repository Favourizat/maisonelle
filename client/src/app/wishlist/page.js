"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import { useWishlist } from "@/context/WishlistContext"
import ProductCard from "@/Components/ProductCard"

export default function WishlistPage() {
    const { wishlist, removeFromWishlist } = useWishlist()
    return (
        <main className="min-h-screen px-4 py-12 md:px-6 md:py-20">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12">
                    <p className="mb-2 text-xs tracking-[0.3em] font-semibold text-black">
                        MAISONELLE COLLECTION
                    </p>

                    <h1 className="text-4xl font-bold text-black sm:text-5xl">
                        My Wishlist
                    </h1>

                    <p className="mt-4 mb-4 text-lg text-black">
                        {wishlist.length} saved product
                        {wishlist.length !== 1 ? "s" : ""}
                    </p>
                    {wishlist.length === 0 ? (
                        <div className="flex items-center justify-center text-center py-20">
                            <div className="flex flex-col items-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E5D8C8]/40">
                                    <Heart
                                        size={28}
                                        strokeWidth={1.2}
                                        className="text-[#3A2A22]/60"
                                    />
                                </div>

                                <h2 className="mt-4 text-2xl font-medium text-[#3A2A22]">
                                    Your wishlist is empty
                                </h2>

                                <p className="mt-3 max-w-md text-sm leading-6 text-[#3A2A22]/60">
                                    Save products you love and come back to them whenever you're ready
                                </p>

                                <Link
                                    href="/products"
                                    className="mt-8 rounded-full bg-[#3A2A22] px-8 py-3 text-sm font-medium text-[#F7F2E8] transition hover:opacity-90"
                                >
                                    Explore products
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols2 gap-x-4 gap-y-10 sm:geid-cols-3 md:grid-cols-4 md:gap-6">
                            {wishlist.map((product) => (
                                <ProductCard
                                    key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </main>
    )
}