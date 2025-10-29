import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/productModel.js';
import products from './data/products.js';

// Load .env variables
dotenv.config();

// Connect to the database
connectDB();

// Function to import data
const importData = async () => {
  try {
    // Clear existing data first
    await Product.deleteMany();

    // Insert our mock products
    await Product.insertMany(products);

    console.log('Data Imported Successfully!');
    process.exit(); // Exit the script
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

// Function to destroy data
const destroyData = async () => {
  try {
    // Clear all data
    await Product.deleteMany();

    console.log('Data Destroyed Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Check for command-line arguments
// 'process.argv[2]' is the 3rd argument (e.g., 'node seeder.js -d')
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}