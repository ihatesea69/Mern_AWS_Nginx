import express from "express";
const router = express.Router();
import { getBanners } from "../controllers/bannerController.js";

router.route("/").get(getBanners);

export default router;
