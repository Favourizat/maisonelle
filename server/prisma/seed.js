
import "dotenv/config";
import prisma from "../src/lib/prisma.js";
import { products } from "../../client/src/data/products.js";

console.log("IMPORTED PRODUCTS FILE CHECK:");

console.log({
    totalProducts: products.length,
    product2: products.find(product => product.id === 2),
    product3: products.find(product => product.id === 3),
});


async function main() {
    for (const product of products) {
        const finalSlug = (product.slug || product.name)
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        const data = {
            name: product.name,
            category: product.category,
            price: String(product.price),
            image: product.image,

            images: product.images?.length
                ? product.images
                : [product.image],

            badge: product.badge ?? null,
            Qty: Number(product.Qty ?? 0),
            rating: product.rating ?? null,
            reviews: product.reviews ?? null,

            desc: product.desc ?? null,
            main1: product.main1 ?? null,
            main2: product.main2 ?? null,
            more1: product.more1 ?? null,
            more2: product.more2 ?? null,

            SKU: product.SKU ?? null,
            Brand: product.Brand ?? null,
            Availability: product.Availability ?? null,

            colors: product.colors ?? [],

            shipping: product.shipping != null
                ? String(product.shipping)
                : null,

            discount: product.discount != null
                ? String(product.discount)
                : null,

            dimensions: product.dimensions ?? null,
        };

        console.log("\nSOURCE DATA:");
console.log({
    id: product.id,
    name: product.name,
    desc: product.desc,
    main1: product.main1,
    main2: product.main2,
    more1: product.more1,
    more2: product.more2,
    SKU: product.SKU,
    Brand: product.Brand,
    Availability: product.Availability,
});

        const savedProduct = await prisma.product.upsert({
            where: {
                id: product.id,
            },

            update: {
                ...data,
                slug: finalSlug,
            },

            create: {
                id: product.id,
                ...data,
                slug: finalSlug,
            },

            select: {
                id: true,
                name: true,
                desc: true,
                main1: true,
                main2: true,
                more1: true,
                more2: true,
                SKU: true,
                Brand: true,
                Availability: true,
            },
        });

        console.log(
            `Product ${savedProduct.id}: ${savedProduct.name} | Description: ${savedProduct.desc ? "SAVED" : "MISSING"} | SKU: ${savedProduct.SKU ? "SAVED" : "MISSING"}`
        );
    }

    console.log(`${products.length} products updated successfully!`);
}

main()
    .catch((error) => {
        console.error("Error updating products:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
