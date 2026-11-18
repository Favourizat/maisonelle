
import prisma from "../lib/prisma.js"
import { Prisma } from "@prisma/client"
import { randomUUID } from "crypto"

export const createOrder = async (req, res) => {
    try {
        const {
            customerName,
            customerEmail,
            customerPhone,
            deliveryAddress,
            deliveryCity,
            items
        } = req.body

        // STEP 1: VALIDATE CUSTOMER DETAILS
        if (
            !customerName?.trim() ||
            !customerEmail?.trim() ||
            !customerPhone?.trim() ||
            !deliveryAddress?.trim() ||
            !deliveryCity?.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all customer details"
            })
        }

        // STEP 2: VALIDATE CART
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Your cart is empty"
            })
        }

        let subtotal = new Prisma.Decimal(0)
        let discount = new Prisma.Decimal(0)

        // FLAT SHIPPING FEE PER ORDER
        const shipping = new Prisma.Decimal(50000)

        const orderItems = []
        const products = new Map()
        const requestedQuantities = new Map()

        // STEP 3: VALIDATE ITEMS AND AGGREGATE QUANTITIES
        for (const item of items) {
            const productId = Number(item.productId)
            const quantity = Number(item.quantity)

            if (
                !Number.isInteger(productId) ||
                productId <= 0 ||
                !Number.isInteger(quantity) ||
                quantity < 1
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid product or quantity"
                })
            }

            requestedQuantities.set(
                productId,
                (requestedQuantities.get(productId) || 0) + quantity
            )
        }

        // STEP 4: FETCH PRODUCTS FROM NEON
        for (const productId of requestedQuantities.keys()) {
            const product = await prisma.product.findUnique({
                where: { id: productId }
            })

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "One or more products could not be found"
                })
            }

            const requestedQuantity = requestedQuantities.get(productId)

            if (product.Qty < requestedQuantity) {
                return res.status(400).json({
                    success: false,
                    message: `${product.name} does not have enough stock`
                })
            }

            products.set(productId, product)
        }

        // STEP 5: CALCULATE PRODUCT PRICES AND DISCOUNTS
        for (const item of items) {
            const productId = Number(item.productId)
            const quantity = Number(item.quantity)

            const product = products.get(productId)

            const originalPrice = new Prisma.Decimal(product.price)

            const discountRate = new Prisma.Decimal(
                product.discount ?? 0
            )

            if (
                originalPrice.lessThanOrEqualTo(0) ||
                discountRate.lessThan(0) ||
                discountRate.greaterThan(100)
            ) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid pricing information for ${product.name}`
                })
            }

            // CALCULATE DISCOUNTED UNIT PRICE
            const discountedPrice = originalPrice
                .minus(
                    originalPrice
                        .mul(discountRate)
                        .div(100)
                )
                .toDecimalPlaces(2)

            // ORIGINAL SUBTOTAL
            const originalSubtotal = originalPrice.mul(quantity)

            // DISCOUNTED SUBTOTAL
            const discountedSubtotal = discountedPrice.mul(quantity)

            subtotal = subtotal.plus(originalSubtotal)

            discount = discount.plus(
                originalSubtotal.minus(discountedSubtotal)
            )

            // SAVE ORDER ITEM
            orderItems.push({
                productId: product.id,
                productName: product.name,
                productImage: product.image,
                price: discountedPrice,
                quantity,
                selectedColor: item.selectedColor ?? undefined
            })
        }

        // STEP 6: CALCULATE FINAL ORDER TOTAL
        const totalAmount = subtotal
            .minus(discount)
            .plus(shipping)

        if (totalAmount.lessThanOrEqualTo(0)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order total"
            })
        }

        // STEP 7: CREATE ORDER
        const order = await prisma.order.create({
            data: {
                customerName: customerName.trim(),
                customerEmail: customerEmail.trim(),
                customerPhone: customerPhone.trim(),
                deliveryAddress: deliveryAddress.trim(),
                deliveryCity: deliveryCity.trim(),

                subtotal,
                discount,
                shipping,
                totalAmount,

                paymentReference: randomUUID(),

                items: {
                    create: orderItems
                }
            },
            include: {
                items: true
            }
        })

        return res.status(201).json({
            success: true,
            message: "Order created successfully",
            order
        })

    } catch (error) {
        console.error("Error creating order:", error)

        return res.status(500).json({
            success: false,
            message: "Failed to create order"
        })
    }
}
