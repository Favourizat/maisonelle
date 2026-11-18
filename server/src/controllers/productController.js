

import prisma from "../lib/prisma.js";

export const getProducts = async (req, res) => {
    try{
        const products = await prisma.product.findMany({
            orderBy: { id: 'asc' }
        })

        res.status(200).json({
            success: true,
            count: products.length,
            products
        })
    } catch(error){
        console.error("Error fetching products:", error)
        res.status(500).json({
            success: false,
            message: "Failed to fetch products"
        })
    }
}

export const getProductsBySlug = async (req, res) => {
    try{
        const { slug } = req.params

        const product = await prisma.product.findUnique(({
            where: {
                slug: slug
            }
        }))

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        res.status(200).json({
            success: true,
            product
        })
    } catch(error){
        console.error("Error fetching product:", error)

        res.status(500).json({
            success: false,
            message: "Failed to fetch product"
        })
    }
}