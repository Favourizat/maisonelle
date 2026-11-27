export const instant = false

import ProductsFilter from "./ProductsFilters";
import ProductsHero from "./ProductsHero";


async function getProducts() {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        const response = await fetch(`${API_URL}/api/products`, {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status}`);
        }

        const data = await response.json();

        return data.products || [];

    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}



export default async function ProductsPage({ searchParams }) {
    const params = await searchParams

    const categoryMap = {
        "living-room": "Living Room",
        "bedroom": "Bedroom",
        "dining-room": "Dining Room",
        "kitchen": "Kitchen",
        "office": "Office",
        "lounge": "Lounge",
        "home-storage": "Home Storage"
    }

    const initialCategory = categoryMap[params?.category] || "ALL"

    const products = await getProducts()

    return (
        <main>
            <div>
                <ProductsHero />
            </div>

            <div className="px-4 md:px-6 py-10 md:py-15">
                <h2 className="text-3xl font-bold">
                    Filter By
                </h2>

                <hr className="w-full border-gray-300 my-6" />

                <ProductsFilter
                    products={products}
                    initialCategory={initialCategory} />
            </div>
        </main>
    )
}