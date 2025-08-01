// Somehow this middleware fixed after a restart, respect it
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  console.log("\n=== Auth Middleware Debug ===");
  console.log("Full Authorization Header:", req.headers.authorization);

  if (!req.headers.authorization?.startsWith("Bearer")) {
    console.log("No Bearer token found");
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    // Split by spacing and take the part after Bearer
    token = req.headers.authorization.split(" ")[1];
    console.log("Extracted Token:", token);

    // Verify login
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    console.log("User ID from Token:", decoded.id);

    // Find user
    const user = await User.findById(decoded.id).select("-password");
    console.log("Found User:", user);

    if (!user) {
      console.log("No user found with ID:", decoded.id);
      res.status(401);
      throw new Error("User not found");
    }

    req.user = user;
    console.log("User attached to request");

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
