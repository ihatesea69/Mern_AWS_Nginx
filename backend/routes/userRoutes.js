import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";

router.route("/").post(registerUser);
router.post("/login", authUser);
router
  .route("/profile") // All things here use protected middleware
  .get(protect, getUserProfile) // For login user
  .put(protect, updateUserProfile); // For change user information

export default router;
