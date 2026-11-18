"use client"

import { products } from "@/data/products"

export default function QuantitySelector() {
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart, isLoaded } = useCart();
    
    return (
        <main>
            <div className="mt-4 flex items-center gap-3">
                <button
                    onClick={() => decreaseQuantity(product.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5D8C8] text-[#3A2A22] transition hover:bg-[#E5D8C8]"
                    aria-label={`Decrease quantity of ${product.name}`}>
                    -
                </button>

                <p className="mt-4 text-xs text-[#3A2A22]/60">
                    Quantity: {product.quantity}
                </p>

                <button
                    onClick={() => increaseQuantity(product.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5D8C8] text-[#3A2A22] transition hover:bg-[#E5D8C8]"
                    aria-label={`Increase quantity of ${product.name}`}>
                    +
                </button>

            </div>
        </main>
    )
}