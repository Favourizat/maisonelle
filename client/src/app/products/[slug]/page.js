

export const instant = false
import { ChevronRight, Star, Dot, Heart } from "lucide-react";
import AddToCartButton from "@/Components/AddToCartButton";
import Image from "next/image";
import Link from "next/link";
import ProductGallery from "@/Components/ProductGallery";
import ProductsTab from "@/Components/ProductsTab";
import ColorSelector from "@/Components/ColorSelector";
import WishlistButton from "@/Components/WishlistButton";
import ProductOptions from "@/Components/ProductOptions";


export default async function ProductPage({ params }) {

    const { slug } = await params

    let product = null

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`,
            {
                cache: "no-store"
            }
        )

        if (!response.ok) {
            throw new Error("Failed to fetch product")
        }

        const data = await response.json()

        product = data.product
    } catch (error) {
        console.error("Error fetching product:", error)
    }

    if (!product) {
        return (
            <main className="flex min-h-[60vh] items-center justify-center px-6">
                <div className="text-center">
                    <h1 className="text-3xl font-medium text-[#3A2A22]">
                        Product Not Found
                    </h1>

                    <p className="mt-3 text-sm text-[#3A2A22]/60">
                        We couldn't find the product you're looking for
                    </p>
                </div>
            </main>
        );
    }


    const originalPrice = Number(product.price)
    const discount = Number(product.discount || 0)

    const hasDiscount = discount > 0 && discount < 100

    const discountedPrice = hasDiscount
        ? originalPrice - (originalPrice * discount / 100)
        : originalPrice

    const formatPrice = (price) =>
        new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(price)

    return (
        <main className="">
            <div className="bg-gray-50 mt-8 md:mt-20">
                <div className="flex items-start px-4 md:px-10 py-10 md:py-12">
                    <Link
                        href={"/"}
                        className="flex items-center justify-center">
                        <h2>Home</h2>
                        <ChevronRight
                            size={18}
                            strokeWidth={1.5} />
                    </Link>
                    <Link
                        href={"/products"}
                        className="flex items-center justify-center">
                        <h2>{product.category}</h2>
                        <ChevronRight
                            size={18}
                            strokeWidth={1.5} />
                    </Link>
                    <Link
                        href={"#"}
                        className="flex items-center justify-center">
                        <h2>{product.slug}</h2>
                    </Link>
                </div>
                <div className="mx-10 grid max-w-7xl gap-5 md:grid-cols-2 md:gap-16 bg-gray-50">


                    <div>
                        <ProductGallery product={product} />
                    </div>


                    <div>

                        <h3 className="relative font-bold text-black bg-white border border-gray-50 rounded-full shadow-2xl text-black text-8px sm:text-8px md:text-10px py-2 flex items-center justify-center w-30 h-8 text-nowrap">
                            {product.category}
                        </h3>

                        <div className="flex flex-col justify-start pt-4">

                            <p className="font-semibold md:text-3xl text-2xl">
                                {product.name}
                            </p>

                            <p className="text-30px mt-2">
                                {product.desc}
                            </p>


                            <div className="mt-3 flex text-center items-center gap-1 text-gray-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} />
                                ))}
                                <span>
                                    {product.rating}
                                </span>
                                <span>
                                    ({product.reviews})
                                </span>
                            </div>
                            <div className="mt-5 h-0.5 w-150 bg-gray-200"></div>

                            <div className="mt-3 flex flex-wrap items-center text-center gap-3">

                                {hasDiscount ? (
                                    <>
                                        <h3 className="text-3xl md:text-4xl font-bold text-[#6F4E37]">
                                            {formatPrice(discountedPrice)}
                                        </h3>

                                        <span className="text-lg text-gray-400 line-through">
                                            {formatPrice(originalPrice)}
                                        </span>
                                    </>
                                ) : (
                                    <h3 className="text-3xl md:text-4xl font-bold">
                                        {formatPrice(originalPrice)}
                                    </h3>
                                )}

                            </div>


                            <div className="">

                                <div>
                                    <ProductOptions product={product} />
                                </div>

                                <div className="mt-8 h-0.5 w-150 bg-gray-200"></div>

                                <div className="mt-4 text-xl text-black">
                                    <h3><span className="font-bold">SKU:</span> {product.SKU}</h3>
                                    <h3><span className="font-bold">Category:</span> {product.category}</h3>
                                    <h3><span className="font-bold">Brand:</span> {product.Brand}</h3>
                                    <h3><span className="font-bold">Availability:</span> {product.Availability}</h3>
                                </div>

                                <div className="mt-8 h-0.5 w-150 bg-gray-200"></div>

                                <div className="mt-4">
                                    <h2 className="text-xl text-black font-bold">
                                        Accepted Payment Methods
                                    </h2>

                                    <div className="relative inset 0 w-[80px] h-[60px] rounded-3xl">
                                        <Image
                                            src="/paystack2.png"
                                            alt="paystack"
                                            fill />
                                    </div>

                                </div>
                                
                            </div>
                        </div>


                    </div>
                </div>

                <div>
                    <ProductsTab product={product} />
                </div>

            </div>
        </main>

    );
}