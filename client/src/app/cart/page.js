
"use client"

import CartHero from "./CartHero"
import { useCart, getDiscountedPrice, getDiscountAmount } from "@/context/CartContext"
import Link from "next/link"
import Image from "next/image"

const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number(amount) || 0)
}

export default function ProductsPage() {
    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        isLoaded,
        cartSubtotal,
        totalSavings,
    } = useCart()

    if (!isLoaded) {
        return (
            <main className="flex min-h-[60vh] items-center justify-center">
                <p>Loading cart...</p>
            </main>
        )
    }

    // Original subtotal before discounts
    const subtotal = cart.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0
    )

    // Shipping calculation remains unchanged
    const shipping = 50000;

    // Final total uses discounted subtotal
    const total = cartSubtotal + shipping

    if (cart.length === 0) {
        return (
            <main className="flex min-h-[60vh] items-center justify-center px-6 py-20">
                <div className="text-center">
                    <p className="text-xs font-medium tracking-[0.3em] text-[#7D8B72]">
                        Maisonelle
                    </p>

                    <h1 className="mt-3 text-4xl font-medium text-[#3A2A22]">
                        Your Cart Is Empty
                    </h1>

                    <p className="mt-4 text-sm text-[#3A2A22]/60">
                        You haven't added anything to your cart yet.
                    </p>

                    <Link
                        href="/products"
                        className="mt-8 inline-block rounded-full bg-[#3A2A22] px-8 py-4 text-sm font-medium text-[#F7F2E8] transition hover:opacity-90"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </main>
        )
    }

    return (
        <main>
            <CartHero />

            <div className="mx-6 md:mx-8 my-10 md:my-12 grid grid-cols-1 md:grid-cols-[75%_25%] gap-6">

                {/* Cart Products */}
                <div className="min-w-0 overflow-x-auto">

                    <div className="min-w-[650px]">

                        {/* Cart Header */}
                        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center gap-4 border-b border-gray-400 pb-5 text-xl font-bold md:text-2xl">
                            <h2>Product Name</h2>
                            <h2>Price</h2>
                            <h2>Quantity</h2>
                            <h2>Subtotal</h2>
                        </div>

                        {cart.map((item) => {
                            const originalPrice = Number(item.price)
                            const discountedPrice = getDiscountedPrice(item)
                            const itemSavings = getDiscountAmount(item)
                            const hasDiscount = itemSavings > 0

                            const itemSubtotal = discountedPrice * item.quantity
                            const originalSubtotal = originalPrice * item.quantity

                            return (
                                <div
                                    key={`${item.id}-${item.selectedColor?.hex}`}
                                    className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center gap-4 border-b border-gray-200 py-6"
                                >

                                    {/* Product Name */}
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-[#F7F2E8]">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                sizes="80px"
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="min-w-0">
                                            <h2 className="text-base font-semibold text-black md:text-xl">
                                                {item.name}
                                            </h2>

                                            <h2 className="text-base font-medium text-gray-700 md:text-lg">
                                                Color: {item.selectedColor?.name}
                                            </h2>

                                            {hasDiscount && (
                                                <span className="mt-1 inline-block text-xs font-semibold text-green-700">
                                                    {Number(item.discount)}% OFF
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Unit Price */}
                                    <div className="flex flex-col gap-1">
                                        <h2 className="text-base font-semibold text-[#6F4E37] md:text-lg">
                                            {formatPrice(discountedPrice)}
                                        </h2>

                                        {hasDiscount && (
                                            <span className="text-sm text-gray-400 line-through">
                                                {formatPrice(originalPrice)}
                                            </span>
                                        )}
                                    </div>

                                    {/* Quantity */}
                                    <div className="flex flex-col items-center gap-2">

                                        <div className="flex items-center justify-between gap-3 rounded-full border border-[#E5D8C8] px-2 py-1">

                                            <button
                                                onClick={() =>
                                                    decreaseQuantity(item.id, item.selectedColor?.hex)
                                                }
                                                className="flex h-8 w-6 items-center justify-center rounded-full text-2xl text-black transition hover:bg-[#E5D8C8]"
                                                aria-label={`Decrease quantity of ${item.name}`}
                                            >
                                                -
                                            </button>

                                            <p className="min-w-5 text-center text-xl text-black font-semibold">
                                                {item.quantity}
                                            </p>

                                            <button
                                                onClick={() =>
                                                    increaseQuantity(item.id, item.selectedColor?.hex)
                                                }
                                                className="flex h-8 w-8 items-center justify-center rounded-full text-2xl text-black transition hover:bg-[#E5D8C8]"
                                                aria-label={`Increase quantity of ${item.name}`}
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={() =>
                                                removeFromCart(item.id, item.selectedColor?.hex)
                                            }
                                            className="text-xs text-[#3A2A22]/50 underline underline-offset-4 transition hover:text-[#3A2A22]"
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    {/* Item Subtotal */}
                                    <div className="flex flex-col gap-1">
                                        <h2 className="text-base font-semibold text-[#6F4E37] md:text-lg">
                                            {formatPrice(itemSubtotal)}
                                        </h2>

                                        {hasDiscount && (
                                            <span className="text-sm text-gray-400 line-through">
                                                {formatPrice(originalSubtotal)}
                                            </span>
                                        )}
                                    </div>

                                </div>
                            )
                        })}

                    </div>
                </div>

                {/* Order Summary */}
                <div className="">
                    <div className="h-fit rounded-2xl bg-[#F7F2E8] p-6 md:p-8">

                        <h2 className="text-lg md:text-2xl font-bold text-black">
                            Order Summary
                        </h2>

                        {/* Original Subtotal */}
                        <div className="mt-6 flex items-center justify-between text-sm">
                            <span className="text-[#3A2A22]/60">
                                Subtotal
                            </span>

                            <span className="font-medium text-[#3A2A22]">
                                {formatPrice(subtotal)}
                            </span>
                        </div>

                        {/* Discount */}
                        {totalSavings > 0 && (
                            <div className="mt-4 flex items-center justify-between text-sm">
                                <span className="text-green-700">
                                    Discount
                                </span>

                                <span className="font-semibold text-green-700">
                                    -{formatPrice(totalSavings)}
                                </span>
                            </div>
                        )}

                        {/* Shipping */}
                        <div className="mt-4 flex items-center justify-between border-b border-[#E5D8C8] pb-5 text-sm">
                            <span className="text-[#3A2A22]/60">
                                Shipping
                            </span>

                            <span className="font-medium text-[#3A2A22]">
                                {shipping === 0 ? "Free" : formatPrice(shipping)}
                            </span>
                        </div>

                        {/* Final Total */}
                        <div className="mt-5 flex items-center justify-between">
                            <span className="font-medium text-[#3A2A22]">
                                Total
                            </span>

                            <span className="text-lg font-bold text-[#3A2A22]">
                                {formatPrice(total)}
                            </span>
                        </div>

                        {/* Savings Message */}
                        {/* {totalSavings > 0 && (
                            <p className="mt-4 text-center text-sm font-medium text-green-700">
                                You're saving {formatPrice(totalSavings)}!
                            </p>
                        )} */}

                        <div className="pt-10 flex items-center justify-center">
                            <Link
                                href="/checkout"
                                className="mt-6 w-full text-center rounded-full bg-[#3A2A22] px-4 py-4 text-sm font-medium text-[#F7F2E8] transition hover:opacity-90"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>

                        <div className="mt-10">
                            <Link
                                href="/products"
                                className="mt-4 block text-center text-sm text-[#3A2A22]/60 transition hover:text-[#3A2A22]"
                            >
                                Continue Shopping
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </main>
    )
}
