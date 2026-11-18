
import prisma from "../lib/prisma.js";

export const initializePayment = async (req, res) => {
    try {
        const orderId = Number(req.params.orderId);

        // STEP 1: VALIDATE ORDER ID
        if (!Number.isInteger(orderId) || orderId <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid order ID"
            });
        }

        // STEP 2: CHECK PAYSTACK CONFIGURATION
        if (!process.env.PAYSTACK_SECRET_KEY) {
            throw new Error("Paystack secret key is missing");
        }

        if (!process.env.CLIENT_URL) {
            throw new Error("Client URL is missing");
        }

        // STEP 3: FETCH ORDER
        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            }
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // STEP 4: CHECK PAYMENT STATUS
        if (order.paymentStatus !== "PENDING") {
            return res.status(400).json({
                success: false,
                message: "This order cannot be paid for"
            });
        }

        // STEP 5: CALCULATE AMOUNT FROM SAVED ORDER
        // Paystack expects the amount in kobo.
        const amount = order.totalAmount
            .mul(100)
            .toDecimalPlaces(0)
            .toFixed(0);

        if (Number(amount) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment amount"
            });
        }

        // STEP 6: PREPARE PAYMENT DETAILS
        const paymentDetails = {
            email: order.customerEmail,
            amount,
            currency: "NGN",
            reference: order.paymentReference,
            callback_url: `${process.env.CLIENT_URL}/payment/callback`
        };

        // STEP 7: INITIALIZE PAYSTACK PAYMENT
        const paystackResponse = await fetch(
            "https://api.paystack.co/transaction/initialize",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(paymentDetails)
            }
        );

        const data = await paystackResponse.json();

        if (!paystackResponse.ok || !data.status) {
            return res.status(502).json({
                success: false,
                message: data.message || "Payment initialization failed"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Payment initialized successfully",
            authorizationUrl: data.data.authorization_url,
            reference: data.data.reference
        });

    } catch (error) {
        console.error("Payment initialization error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to initialize payment"
        });
    }
};


export const verifyPayment = async (req, res) => {
    try {
        const { reference } = req.params;

        // STEP 1: VALIDATE REFERENCE
        if (!reference) {
            return res.status(400).json({
                success: false,
                message: "Payment reference is required"
            });
        }

        // STEP 2: CHECK PAYSTACK CONFIGURATION
        if (!process.env.PAYSTACK_SECRET_KEY) {
            throw new Error("Paystack secret key is missing");
        }

        // STEP 3: FIND ORDER USING PAYMENT REFERENCE
        const order = await prisma.order.findUnique({
            where: {
                paymentReference: reference
            }
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // STEP 4: VERIFY PAYMENT WITH PAYSTACK
        const paystackResponse = await fetch(
            `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                }
            }
        );

        const verification = await paystackResponse.json();

        if (!paystackResponse.ok || !verification.status) {
            return res.status(400).json({
                success: false,
                message: verification.message || "Payment verification failed"
            });
        }

        const transaction = verification.data;

        // STEP 5: CALCULATE EXPECTED PAYMENT AMOUNT
        const expectedAmount = Number(
            order.totalAmount
                .mul(100)
                .toDecimalPlaces(0)
                .toFixed(0)
        );

        // STEP 6: CONFIRM PAYMENT DETAILS
        if (
            transaction.status !== "success" ||
            transaction.reference !== order.paymentReference ||
            transaction.amount !== expectedAmount ||
            transaction.currency !== "NGN"
        ) {
            return res.status(400).json({
                success: false,
                message: "Payment could not be confirmed"
            });
        }

        // STEP 7: UPDATE ORDER STATUS
        // Avoid updating an order that has already been paid.
        if (order.paymentStatus !== "PAID") {
            await prisma.order.update({
                where: {
                    id: order.id
                },
                data: {
                    paymentStatus: "PAID"
                }
            });
        }

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            orderId: order.id,
            paymentStatus: "PAID"
        });

    } catch (error) {
        console.error("Payment verification error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to verify payment"
        });
    }
};
