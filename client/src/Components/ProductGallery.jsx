
"use client"

import Image from "next/image"
import { useState } from "react"

export default function ProductGallery({ product }) {
    const images = product.images?.length
        ? product.images
        : [product.image]

    const [selectedImage, setSelectedImage] = useState(images[0])

    return (
        <div>
            <div className="relative w-full h-[350px] md:h-[450px] lg:h-[600px] overflow-hidden">
                <Image
                    src={selectedImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>

            <div className="mt-4 flex gap-3 overflow-x-auto">
                {images.map((image, index) => (
                    <button
                        type="button"
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={`shrink-0 rounded-3xl border-2 ${
                            image === selectedImage
                                ? "border-[#6F4E37]"
                                : "border-transparent"
                        }`}
                    >
                        <Image
                            src={image}
                            alt={`${product.name} image ${index + 1}`}
                            width={80}
                            height={80}
                            className="h-24 w-24 rounded-3xl object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}
