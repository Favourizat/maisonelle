
import express from "express"
import cors from "cors"
import "dotenv/config"

import productRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"

const app = express()

const allowedOrigins = [
    "http://localhost:3000",
    process.env.CLIENT_URL
].filter(Boolean)


app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true
}))

app.use(express.json())

app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/payments", paymentRoutes)


app.get("/", (req, res) => {
    res.json({
        message: "Maisonelle API is running!"
    })
})

if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 5001

    app.listen(PORT, () => {
        console.log(`Maisonelle server running on ${PORT}`)
    })
}

export default app
