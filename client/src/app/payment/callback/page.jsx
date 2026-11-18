
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

function PaymentCallbackContent() {
    const searchParams = useSearchParams();
    const { clearCart } = useCart()

    const [status, setStatus] = useState("verifying");
    const [message, setMessage] = useState("Verifying your payment...");

    useEffect(() => {
        const reference = searchParams.get("reference");

        if (!reference) {
            setStatus("failed");
            setMessage("Payment reference not found.");
            return;
        }

        async function verifyPayment() {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL;

                const response = await fetch(
                    `${API_URL}/api/payments/verify/${encodeURIComponent(reference)}`
                );

                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(
                        data.message || "Payment verification failed."
                    );
                }

                clearCart()
                setStatus("success");
                setMessage("Your payment was successful. Thank you for shopping with Maisonelle!");

            } catch (error) {
                console.error("Payment verification error:", error);

                setStatus("failed");
                setMessage(
                    error.message || "We could not verify your payment."
                );
            }
        }

        verifyPayment();
    }, [searchParams]);

    return (
        <main className="flex min-h-[70vh] items-center justify-center px-6 py-16">
            <div className="w-full max-w-lg rounded-2xl border border-[#E5D8C8] bg-white shadow-lg p-8 text-center">

                <p className="text-sm font-medium tracking-[0.2em] text-[#7D8B72]">
                    MAISONELLE
                </p>

                <h1 className="mt-5 text-3xl font-semibold text-[#3A2A22]">
                    {status === "verifying"
                        ? "Verifying Payment"
                        : status === "success"
                            ? "Payment Successful"
                            : "Payment Unsuccessful"}
                </h1>

                <p className="mt-4 text-sm leading-7 text-[#3A2A22]/70">
                    {message}
                </p>

                {status === "verifying" && (
                    <p className="mt-6 text-sm text-[#7D8B72]">
                        Please wait...
                    </p>
                )}

                {status === "success" && (
                    <Link
                        href="/products"
                        className="mt-8 inline-block rounded-full bg-[#3A2A22] px-8 py-4 text-sm font-medium text-[#F7F2E8] transition hover:opacity-90"
                    >
                        Continue Shopping
                    </Link>
                )}

                {status === "failed" && (
                    <Link
                        href="/cart"
                        className="mt-8 inline-block rounded-full bg-[#3A2A22] px-8 py-4 text-sm font-medium text-[#F7F2E8] transition hover:opacity-90"
                    >
                        Return to Cart
                    </Link>
                )}

            </div>
        </main>
    );
}

export default function PaymentCallback() {
    return (
        <Suspense
            fallback={
                <main className="flex min-h-[70vh] items-center justify-center">
                    <p>Loading payment details...</p>
                </main>
            }
        >
            <PaymentCallbackContent />
        </Suspense>
    );
}