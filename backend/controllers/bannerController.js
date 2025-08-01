import asyncHandler from "express-async-handler";
import Banner from "../models/bannerModel.js";

// @desc    Fetch all active banners
// @route   GET /api/banners
// @access  Public
const getBanners = asyncHandler(async (req, res) => {
  const banners = await Banner.find({ isActive: true }).sort("order");
  res.json(banners);
});

export { getBanners };
