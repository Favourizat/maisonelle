"use client";

import { useState } from "react";
import {
    useCart,
    getDiscountedPrice,
    getDiscountAmount,
} from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number(amount) || 0);
};

export default function CheckoutForm() {
    const { cart, isLoaded } = useCart();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    if (!isLoaded) {
        return (
            <main className="flex min-h-[60vh] items-center justify-center px-6">
                <p className="text-sm text-[#3A2A22]/60">
                    Loading checkout
                </p>
            </main>
        );
    }

    if (cart.length === 0) {
        return (
            <main className="flex min-h-[60vh] items-center justify-center px-6 py-12">
                <div className="max-w-md text-center">

                    <p className="text-xs font-medium tracking-[0.3em] text-[#7D8B72]">
                        Maisonelle
                    </p>

                    <h1 className="mt-3 text-3xl font-medium text-[#3A2A22]">
                        Your cart is empty
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-[#3A2A22]/60">
                        Add some products to your cart before proceeding to checkout
                    </p>

                    <Link
                        href="/products"
                        className="mt-8 inline-block rounded-full bg-[#3A2A22] px-8 py-4 text-sm font-medium tracking-wide text-[#F7F2E8] transition hover:opacity-90"
                    >
                        Continue Shopping
                    </Link>

                </div>
            </main>
        );
    }

    // ORIGINAL SUBTOTAL
    const subtotal = cart.reduce(
        (total, item) =>
            total + Number(item.price) * item.quantity,
        0
    );

    // TOTAL DISCOUNT
    const discount = cart.reduce(
        (total, item) =>
            total + getDiscountAmount(item) * item.quantity,
        0
    );

    // SUBTOTAL AFTER DISCOUNT
    const discountedSubtotal = subtotal - discount;

    // DELIVERY COST
   const delivery = 50000;

    // FINAL TOTAL
    const total = discountedSubtotal + delivery;

    async function handleSubmit(event) {
        event.preventDefault();

        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Please enter your full name";
        }

        if (!email.trim()) {
            newErrors.email = "Please enter your email address";
        }

        if (!phone.trim()) {
            newErrors.phone = "Please enter your phone number";
        }

        if (!address.trim()) {
            newErrors.address = "Please enter your delivery address";
        }

        if (!city.trim()) {
            newErrors.city = "Please enter your city";
        }

        setErrors(newErrors);
        setSubmitError("");

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        if (!API_URL) {
            setSubmitError("API URL is not configured.");
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await fetch(`${API_URL}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customerName: name,
                    customerEmail: email,
                    customerPhone: phone,
                    deliveryAddress: address,
                    deliveryCity: city,

                    items: cart.map((item) => ({
                        productId: item.id,
                        quantity: item.quantity,
                        selectedColor: item.selectedColor ?? null,
                    })),
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Unable to create order"
                );
            }

            const orderId = data.order.id;

            const paymentResponse = await fetch(
                `${API_URL}/api/payments/initialize/${orderId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const paymentData = await paymentResponse.json();

            if (!paymentResponse.ok || !paymentData.success) {
                throw new Error(
                    paymentData.message || "Payment initialization failed"
                );
            }

            window.location.href = paymentData.authorizationUrl;

        } catch (error) {
            console.error("Checkout error:", error);

            setSubmitError(
                error.message || "Something went wrong. Please try again."
            );

        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <main className="px-4 py-12 md:px-6 md:py-20">

                <div className="mx-auto max-w-6xl">

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px] lg:gap-20">
                        <div>
                            <div className="mb-10">

                                <p className="text-lg font-medium text-black">
                                    Maisonelle
                                </p>

                                <h1 className="mt-2 text-4xl font-bold text-black">
                                    Checkout
                                </h1>

                                <p className="mt-3 text-lg text-black">
                                    Complete your details to place your order.
                                </p>

                            </div>

                            <section>

                                <div className="border-b border-[#E5D8C8] pb-4">
                                    <h2 className="text-lg font-semibold uppercase tracking-[0.1em] text-black">
                                        Contact Information
                                    </h2>
                                </div>

                                <div className="mt-6">

                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-base font-medium text-black"
                                    >
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="w-full rounded-xl border border-[#E5D8C8] px-4 py-3 text-sm text-[#3A2A22] outline-none transition placeholder:text-[#3A2A22]/40 focus:border-[#3A2A22]"
                                    />

                                    {errors.name && (
                                        <p className="mt-2 text-xs text-red-700">
                                            {errors.name}
                                        </p>
                                    )}

                                </div>

                                <div className="mt-6">

                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-base font-medium text-black"
                                    >
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full rounded-xl border border-[#E5D8C8] px-4 py-3 text-sm text-[#3A2A22] outline-none transition placeholder:text-[#3A2A22]/40 focus:border-[#3A2A22]"
                                    />

                                    {errors.email && (
                                        <p className="mt-2 text-xs text-red-700">
                                            {errors.email}
                                        </p>
                                    )}

                                </div>

                                <div className="mt-6">

                                    <label
                                        htmlFor="phone"
                                        className="mb-2 block text-base font-medium text-black"
                                    >
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="0000 0000 0000"
                                        className="w-full rounded-xl border border-[#E5D8C8] px-4 py-3 text-sm text-[#3A2A22] outline-none transition placeholder:text-[#3A2A22]/40 focus:border-[#3A2A22]"
                                    />

                                    {errors.phone && (
                                        <p className="mt-2 text-xs text-red-700">
                                            {errors.phone}
                                        </p>
                                    )}

                                </div>

                            </section>

                            <section className="mt-12">

                                <div className="border-b border-[#E5D8C8] pb-4">
                                    <h2 className="text-lg font-semibold uppercase tracking-[0.1em] text-black">
                                        Delivery Information
                                    </h2>
                                </div>

                                <div className="mt-6">

                                    <label
                                        htmlFor="address"
                                        className="mb-2 block text-base font-medium text-black"
                                    >
                                        Delivery Address
                                    </label>

                                    <input
                                        type="text"
                                        id="address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Enter your delivery address"
                                        className="w-full rounded-xl border border-[#E5D8C8] px-4 py-3 text-sm text-[#3A2A22] outline-none transition placeholder:text-[#3A2A22]/40 focus:border-[#3A2A22]"
                                    />

                                    {errors.address && (
                                        <p className="mt-2 text-xs text-red-700">
                                            {errors.address}
                                        </p>
                                    )}

                                </div>

                                <div className="mt-6">

                                    <label
                                        htmlFor="city"
                                        className="mb-2 block text-base font-medium text-black"
                                    >
                                        City
                                    </label>

                                    <input
                                        type="text"
                                        id="city"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder="Enter your city"
                                        className="w-full rounded-xl border border-[#E5D8C8] px-4 py-3 text-sm text-[#3A2A22] outline-none transition placeholder:text-[#3A2A22]/40 focus:border-[#3A2A22]"
                                    />

                                    {errors.city && (
                                        <p className="mt-2 text-xs text-red-700">
                                            {errors.city}
                                        </p>
                                    )}

                                </div>

                            </section>

                        </div>

                        <aside className="lg:sticky lg:top-24 lg:self-start">

                            <div className="rounded-2xl border border-[#E5D8C8] bg-[#F7F2E8] p-6 md:p-8">

                                <div className="border-b border-[#E5D8C8] pb-5">

                                    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3A2A22]">
                                        Order Summary
                                    </h2>

                                </div>

                                <div className="space-y-5 border-b border-[#E5D8C8] py-6">

                                    {cart.map((item) => {
                                        const discountedPrice = getDiscountedPrice(item);
                                        const originalPrice = Number(item.price);
                                        const itemDiscount = getDiscountAmount(item);

                                        return (
                                            <div
                                                key={`${item.id}-${item.selectedColor?.hex || "default"}`}
                                                className="flex items-center gap-4"
                                            >
                                                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>

                                                <div className="min-w-0 flex-1">

                                                    <p className="truncate text-sm font-medium text-[#3A2A22]">
                                                        {item.name}
                                                    </p>

                                                    <p className="mt-1 text-xs text-[#3A2A22]/50">
                                                        Qty: {item.quantity}
                                                    </p>

                                                </div>

                                                <div className="flex flex-col items-end gap-1">

                                                    <p className="text-sm font-semibold text-[#6F4E37]">
                                                        {formatPrice(discountedPrice * item.quantity)}
                                                    </p>

                                                    {itemDiscount > 0 && (
                                                        <p className="text-xs text-gray-400 line-through">
                                                            {formatPrice(originalPrice * item.quantity)}
                                                        </p>
                                                    )}

                                                    {itemDiscount > 0 && (
                                                        <span className="text-xs font-semibold text-[#7D8B72]">
                                                            {Number(item.discount)}% OFF
                                                        </span>
                                                    )}

                                                </div>

                                            </div>
                                        );
                                    })}

                                </div>

                                <div className="space-y-4 py-6">
                                    <div className="flex items-center justify-between text-sm">

                                        <span className="text-[#3A2A22]/60">
                                            Subtotal
                                        </span>

                                        <span className="font-medium text-[#3A2A22]">
                                            {formatPrice(subtotal)}
                                        </span>

                                    </div>

                                    {discount > 0 && (
                                        <div className="flex items-center justify-between text-sm">

                                            <span className="text-[#3A2A22]/60">
                                                Discount
                                            </span>

                                            <span className="font-medium text-[#7D8B72]">
                                                -{formatPrice(discount)}
                                            </span>

                                        </div>
                                    )}

                                    <div className="flex items-center justify-between text-sm">

                                        <span className="text-[#3A2A22]/60">
                                            Delivery
                                        </span>

                                        <span className="font-medium text-[#3A2A22]">
                                            {delivery === 0 ? "Free" : formatPrice(delivery)}
                                        </span>

                                    </div>

                                </div>

                                <div className="border-t border-[#E5D8C8] pt-5">

                                    <div className="flex items-center justify-between">

                                        <span className="text-sm font-semibold uppercase tracking-wider text-[#3A2A22]">
                                            Total
                                        </span>

                                        <span className="text-lg font-semibold text-[#3A2A22]">
                                            {formatPrice(total)}
                                        </span>

                                    </div>

                                    {discount > 0 && (
                                        <p className="mt-3 text-right text-xs font-medium text-[#7D8B72]">
                                            You save {formatPrice(discount)} on this order
                                        </p>
                                    )}

                                </div>

                                {submitError && (
                                    <p className="mt-4 text-sm text-red-600">
                                        {submitError}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="mt-6 w-full rounded-xl bg-[#3A2A22] px-6 py-4 text-sm font-medium text-[#F7F2E8] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isSubmitting ? "Processing..." : "Continue to Payment"}
                                </button>

                            </div>

                        </aside>

                    </div>

                </div>

            </main>
        </form>
    );
}