import express from 'express';
const router = express.Router(); 
import Product from '../models/productModel.js'; 


router.get('/', async (req, res) => {
  try {
    // Use the Product model to find ALL products in the collection
    const products = await Product.find({});

    // Send the products back as a JSON response
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;