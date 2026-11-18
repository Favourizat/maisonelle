
"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function AddToCartButton({ product, selectedColor }) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    function handleAddToCart() {
        addToCart({
            ...product,
            price: Number(product.price),
            shipping: Number(product.shipping ?? 0),
            discount: Number(product.discount ?? 0),
            selectedColor
        });

        setAdded(true);

        setTimeout(() => {
            setAdded(false);
        }, 2000);
    }

    return (
        <button
            onClick={handleAddToCart}
            className="w-[250px] rounded-full bg-[#3A2A22] px-4 py-4 text-sm font-medium tracking-wide text-[#F7F2E8] transition hover:opacity-90 md:max-w-md"
        >
            {added ? "Added to Cart!" : "Add to Cart"}
        </button>
    );
}