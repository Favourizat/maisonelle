
"use client"

export default function ColorSelector({
    product,
    selectedColor,
    setSelectedColor
}) {
    if (!Array.isArray(product.colors) || product.colors.length === 0) {
        return null
    }

    return (
        <div>
            <div className="mt-6">
                <h3>
                    Color: {selectedColor?.name ?? "Select a color"}
                </h3>

                <div className="flex gap-2 mt-3">
                    {product.colors.map((color, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            aria-label={`Select ${color.name}`}
                            className={`rounded-full border-2 p-1 ${
                                selectedColor?.name === color.name
                                    ? "border-[#6F4E37]"
                                    : "border-transparent"
                            }`}
                        >
                            <span
                                className="block h-8 w-8 rounded-full"
                                style={{ backgroundColor: color.hex }}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
