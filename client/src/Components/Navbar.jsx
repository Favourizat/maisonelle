
"use client"

import Image from "next/image"
import {
    Sofa,
    Phone,
    Search,
    Heart,
    UserRound,
    ShoppingBag,
    ShoppingCart,
    Dot,
    Menu,
    X
} from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react"
import { useState, useEffect } from "react"
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const containerVariants = {
    hidden: {
        opacity: 0,
    },

    visible: {
        transition: {
            staggerChildren: 0.3,
        },
    },
};

// Child animation
const wordVariants = {
    hidden: {
        opacity: 0,
        x: 60,
    },

    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export default function Navbar() {

    const { cart } = useCart()
    const { wishlist } = useWishlist()
    const [isOpen, setIsOpen] = useState(false)

    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [products, setProducts] = useState([])


    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch
                (`${process.env.NEXT_PUBLIC_API_URL}/api/products`)

                if (!response.ok) {
                    throw new Error("Failed to fetch products")
                }

                const data = await response.json()

                console.log("Products API response:", data)

                const productList = Array.isArray(data)
                    ? data
                    : data.products

                setProducts(
                    Array.isArray(productList) ? productList : []
                )

            } catch (error) {
                console.error("Failed to fetch products:", error)
                setProducts([])
            }
        }

        fetchProducts()
    }, [])


    const search = searchTerm.toLowerCase().trim()

    const filteredProducts = products.filter((product) => {
        if (!search) return false

        return (
            product.name.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search)
        )
    })

    const closeSearch = () => {
        setSearchTerm("")
        setIsSearchOpen(false)
    }


    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    )

    const wishlistCount = wishlist.length

    return (
        <main>
            <div>
                <div>
                    <h1 className="[font-family:var(--font-cormorant)] font-bold text-base sm:text-2xl md:text-4xl bg-black text-white text-center py-3 font-semibold">
                        Exclusive Furniture Sale Up To 30% Off
                    </h1>
                </div>

                <div className="flex flex-wrap justify-between items-center gap-y-3 px-2 py-5 sm:px-4 md:flex-nowrap md:px-0 md:py-8">

                    <div className="hidden lg:flex items-center gap-1 sm:gap-2 font-[var(--font-dm-sans)]">
                        <span className="border border-gray-50 bg-gray-100 inline-flex rounded-full p-2 sm:p-3 mx-1 sm:mx-4">
                            <Phone size={35} strokeWidth={1.5} className="w-6 h-6 sm:w-[35px] sm:h-[35px]" />
                        </span>
                        <div className="text-xs sm:text-xl font-semibold">
                            <h1>Need Help?</h1>
                            <p>+123 456 789</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <span className="border bg-black rounded-full p-2 inline-flex cursor-pointer">
                            <Sofa size={40} strokeWidth={1.5} className="text-white w-7 h-7 sm:w-10 sm:h-10" />
                        </span>
                        <span className="font-[var(--font-cormorant)] text-3xl sm:text-4xl text-black text-center py-3 font-bold cursor-pointer">Maisonelle</span>
                    </div>

                    <div className="flex items-center pr-1 sm:pr-4">
                        
                        {/* SEARCH AREA */}
                        <div className="relative">

                            {!isSearchOpen ? (
                                <button
                                    type="button"
                                    onClick={() => setIsSearchOpen(true)}
                                    aria-label="Search"
                                    className="transition hover:opacity-60"
                                >
                                    <Search
                                        size={32}
                                        strokeWidth={1.5}
                                        className="cursor-pointer transition hover:scale-110"
                                    />
                                </button>
                            ) : (
                                <div className="flex w-64 items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2">

                                    <Search size={18} className="shrink-0 text-gray-600" />

                                    <input
                                        autoFocus
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search products..."
                                        className="w-full bg-transparent text-sm text-black outline-none placeholder:text-gray-400"
                                    />

                                    <button
                                        type="button"
                                        onClick={closeSearch}
                                        aria-label="Close search"
                                        className="shrink-0 text-gray-500 hover:text-black"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}

                            {/* SEARCH RESULTS */}
                            {isSearchOpen && search && (
                                <div className="absolute right-0 top-full z-50 mt-3 w-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">

                                    <div className="max-h-96 overflow-y-auto p-4">

                                        {filteredProducts.length > 0 ? (
                                            <>
                                                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                    Search Results ({filteredProducts.length})
                                                </p>

                                                <div className="space-y-1">
                                                    {filteredProducts.map((product) => (
                                                        <Link
                                                            key={product.id ?? product._id}
                                                            href={`/products/${product.slug}`}
                                                            onClick={closeSearch}
                                                            className="block rounded-lg px-3 py-3 transition hover:bg-gray-100"
                                                        >
                                                            <div className="flex items-center justify-between gap-4">

                                                                <div className="min-w-0">
                                                                    <p className="truncate text-sm font-medium text-black">
                                                                        {product.name}
                                                                    </p>

                                                                    <p className="mt-1 text-xs text-gray-500">
                                                                        {typeof product.category === "string"
                                                                            ? product.category
                                                                            : product.category?.name ?? ""}
                                                                    </p>
                                                                </div>

                                                                <p className="shrink-0 text-xs text-gray-600">
                                                                    ₦{Number(product.price ?? 0).toLocaleString()}
                                                                </p>

                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="py-8 text-center">
                                                <p className="text-sm text-gray-600">
                                                    No products found
                                                </p>

                                                <p className="mt-1 text-xs text-gray-400">
                                                    Try another search term.
                                                </p>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            )}

                        </div>
                        
                        <Link href="/wishlist"
                            className="relative inline-flex">
                            <Heart size={32} strokeWidth={1.5} className="mx-1 w-5 h-5 sm:w-8 sm:h-8 cursor-pointer" />
                            {wishlistCount > 0 && (

                                <span className="absolute -right-0.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#3A2A22] px-1 text-[9px] font-medium text-white">
                                    {wishlistCount}
                                </span>

                            )}
                        </Link>
                        {/* <UserRound size={32} strokeWidth={1.5} className="mx-1 sm:mx-3 w-5 h-5 sm:w-8 sm:h-8 cursor-pointer" /> */}
                        <Link href="/cart"
                            className="relative inline-flex">
                            <ShoppingBag size={32} strokeWidth={1.5} className="mx-1 w-5 h-5 sm:w-8 sm:h-8 cursor-pointer" />
                            {cartCount > 0 && (
                                <span className="absolute -right-0.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#3A2A22] px-1 text-[9px] font-medium text-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>

                   


                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                        className="rounded-full p-2 transition hover:bg-[#3A2A22]/5 md:hidden"
                    >
                        {isOpen ? (
                            <X size={22} strokeWidth={1.5} />
                        ) : (
                            <Menu size={22} strokeWidth={1.5} />
                        )}
                    </button>

                </div>


                <div className="hidden md:flex bg-gray-50 items-center justify-center gap-5 lg:gap-15 font-[var(--font-dm-sans)] text-xl font-medium">
                    <Link href={"/"} className="py-4">Home</Link>
                    <Link href={"/about"} className="py-4">About Us</Link>
                    <Link href={"/products"} className="py-4">Shop</Link>
                    {/* <Link href={"/gallery"} className="py-4">Gallery</Link>
                    <Link href={"/blog"} className="py-4">Blog</Link> */}
                    <Link href={"/contact"} className="py-4">Contact Us</Link>
                </div>

            </div>


            {isOpen && (
                <div className="border-t border-gray-200 bg-white md:hidden">
                    <div className="flex flex-col px-6 py-4">

                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="border-b border-gray-100 py-4 text-sm font-semibold text-[#14213D] hover:text-[#f6a611]"
                        >
                            Home
                        </Link>

                        <Link
                            href="/about"
                            onClick={() => setIsOpen(false)}
                            className="border-b border-gray-100 py-4 text-sm font-semibold text-[#14213D] hover:text-[#f6a611]"
                        >
                            About Us
                        </Link>

                        <Link
                            href="/products"
                            onClick={() => setIsOpen(false)}
                            className="border-b border-gray-100 py-4 text-sm font-semibold text-[#14213D] hover:text-[#f6a611]"
                        >
                            Shop
                        </Link>

                        <Link
                            href="/gallery"
                            onClick={() => setIsOpen(false)}
                            className="border-b border-gray-100 py-4 text-sm font-semibold text-[#14213D] hover:text-[#f6a611]"
                        >
                            Gallery
                        </Link>

                        <Link
                            href="/blog"
                            onClick={() => setIsOpen(false)}
                            className="border-b border-gray-100 py-4 text-sm font-semibold text-[#14213D] hover:text-[#f6a611]"
                        >
                            Blog
                        </Link>

                        <Link
                            href="/contact"
                            onClick={() => setIsOpen(false)}
                            className="border-b border-gray-100 py-4 text-sm font-semibold text-[#14213D] hover:text-[#f6a611]"
                        >
                            Contact Us
                        </Link>

                    </div>
                </div>
            )}

        </main>
    )
}
