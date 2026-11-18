
"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

const CartContext = createContext()

// Calculate the discounted price of a product
export function getDiscountedPrice(product) {
    const originalPrice = Number(product.price)
    const discount = Number(product.discount || 0)

    if (!Number.isFinite(originalPrice)) return 0

    if (
        !Number.isFinite(discount) ||
        discount <= 0 ||
        discount >= 100
    ) {
        return originalPrice
    }

    return originalPrice - (originalPrice * discount / 100)
}

// Calculate how much is saved on one product
export function getDiscountAmount(product) {
    const originalPrice = Number(product.price)

    if (!Number.isFinite(originalPrice)) return 0

    return originalPrice - getDiscountedPrice(product)
}

export default function CartProvider({ children }) {
    const [cart, setCart] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Load saved cart
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem("maisonelle-cart")

            if (savedCart) {
                const parsedCart = JSON.parse(savedCart)

                const validCart = parsedCart
                    .filter(
                        (item) =>
                            item.id !== undefined &&
                            item.id !== null &&
                            item.name &&
                            item.price !== undefined &&
                            item.price !== null
                    )
                    .map((item) => ({
                        ...item,
                        quantity: Math.max(1, Number(item.quantity) || 1),
                    }))

                setCart(validCart)
            }
        } catch (error) {
            console.error("Failed to load cart:", error)
        } finally {
            setIsLoaded(true)
        }
    }, [])

    // Save cart
    useEffect(() => {
        if (!isLoaded) return

        try {
            localStorage.setItem("maisonelle-cart", JSON.stringify(cart))
        } catch (error) {
            console.error("Failed to save cart:", error)
        }
    }, [cart, isLoaded])

    // Add product to cart
    function addToCart(product) {
        setCart((currentCart) => {
            const existingProduct = currentCart.find(
                (item) =>
                    item.id === product.id &&
                    item.selectedColor?.hex === product.selectedColor?.hex
            )

            if (existingProduct) {
                return currentCart.map((item) =>
                    item.id === product.id &&
                    item.selectedColor?.hex === product.selectedColor?.hex
                        ? {
                            ...item,
                            ...product,
                            quantity: item.quantity + 1,
                        }
                        : item
                )
            }

            return [
                ...currentCart,
                {
                    ...product,
                    quantity: 1,
                },
            ]
        })
    }

    // Increase quantity
    function increaseQuantity(productId, colorHex) {
        setCart((currentCart) =>
            currentCart.map((item) =>
                item.id === productId &&
                item.selectedColor?.hex === colorHex
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        )
    }

    // Decrease quantity
    function decreaseQuantity(productId, colorHex) {
        setCart((currentCart) =>
            currentCart
                .map((item) =>
                    item.id === productId &&
                    item.selectedColor?.hex === colorHex
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        )
    }

    // Remove product
    function removeFromCart(productId, colorHex) {
        setCart((currentCart) =>
            currentCart.filter(
                (item) =>
                    !(
                        item.id === productId &&
                        item.selectedColor?.hex === colorHex
                    )
            )
        )
    }

    // Clear cart
    function clearCart() {
        setCart([])
    }

    // Calculate discounted cart subtotal and total savings
    const cartSubtotal = useMemo(() => {
        return cart.reduce(
            (total, item) =>
                total + getDiscountedPrice(item) * item.quantity,
            0
        )
    }, [cart])

    const totalSavings = useMemo(() => {
        return cart.reduce(
            (total, item) =>
                total + getDiscountAmount(item) * item.quantity,
            0
        )
    }, [cart])

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart,
                isLoaded,

                // Discount calculations
                getDiscountedPrice,
                getDiscountAmount,
                cartSubtotal,
                totalSavings,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}
