

import express from "express";
import { getProducts } from "../controllers/productController.js";
import { getProductsBySlug } from "../controllers/productController.js";

const router = express.Router()

router.get("/", getProducts)
router.get("/:slug", getProductsBySlug)

export default router