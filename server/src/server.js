

import express from "express"
import cors from "cors"
import "dotenv/config"
import productRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(express.json())

app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/payments", paymentRoutes)


app.get("/", (rew, res) => {
    res.json({
        message: "Maisonelle API is running!"
    })
})

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log(`Maisonelle server running on ${PORT}`)
})