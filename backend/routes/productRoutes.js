import express from "express";
const router = express.Router();
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// Split the routes to make getProducts public
router.get("/", getProducts); // Public route - anyone can view products
router.post("/", protect, admin, createProduct); // Protected admin route

router
  .route("/:id")
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
