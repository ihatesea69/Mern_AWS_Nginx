import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import banners from "./data/banners.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Banner from "./models/bannerModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

// Connect to MongoDB
const initializeDB = async () => {
  try {
    await connectDB();
    console.log("MongoDB Connected".cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    // Clear existing data
    console.log("Clearing existing data...".yellow);
    await Promise.all([
      Order.deleteMany(),
      Product.deleteMany(),
      User.deleteMany(),
      Banner.deleteMany(),
    ]);

    // Create users
    console.log("Creating users...".yellow);
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // Add admin user reference to products
    console.log("Creating products...".yellow);
    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }));

    // Insert products and banners
    console.log("Creating banners...".yellow);
    await Promise.all([
      Product.insertMany(sampleProducts),
      Banner.insertMany(banners),
    ]);

    console.log("Data Import Complete!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Import Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    console.log("Destroying all data...".yellow);
    await Promise.all([
      Order.deleteMany(),
      Product.deleteMany(),
      User.deleteMany(),
      Banner.deleteMany(),
    ]);

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Destroy Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

// Initialize database connection
initializeDB().then(() => {
  // Check command line arguments
  if (process.argv[2] === "-d") {
    destroyData();
  } else if (process.argv[2] === "-i") {
    importData();
  } else {
    console.log("Please specify -i (import) or -d (destroy)".yellow.bold);
    process.exit();
  }
});
