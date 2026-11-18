
"use client"

import { useState } from "react"
import ColorSelector from "./ColorSelector"
import AddToCartButton from "./AddToCartButton"
import WishlistButton from "./WishlistButton"

export default function ProductOptions({ product }) {

    const [selectedColor, setSelectedColor] = useState(
        Array.isArray(product.colors) && product.colors.length > 0
            ? product.colors[0]
            : null
    )

    return (
        <div>

            {Array.isArray(product.colors) && product.colors.length > 0 && (
                <ColorSelector
                    product={product}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                />
            )}

            <div className="flex items-center gap-4 mt-8">
                <AddToCartButton
                    product={product}
                    selectedColor={selectedColor}
                />

                <WishlistButton product={product} />
            </div>

        </div>
    )
}
