

import express from "express"
import { initializePayment, verifyPayment } from "../controllers/paymentController.js"

const router = express.Router()

router.post("/initialize/:orderId", initializePayment)

router.get("/verify/:reference", verifyPayment)

export default router