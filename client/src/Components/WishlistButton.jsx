
"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistButton({ product }) {
    const { toggleWishlist, isInWishlist } = useWishlist();

    const saved = isInWishlist(product.id);

    return (
        <button
            type="button"
            onClick={() => toggleWishlist(product)}
            aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
            className="flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-300 p-3 text-black transition-all duration-300 hover:bg-black hover:text-white"
        >
            <Heart
                size={24}
                strokeWidth={1.5}
                fill={saved ? "#6F4E37" : "none"}
                className={saved ? "text-[#6F4E37]" : ""}
            />
        </button>
    );
}
