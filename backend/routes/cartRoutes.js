import express from 'express';
const router = express.Router();
import Cart from '../models/cartModel.js';       
import Product from '../models/productModel.js'; 


router.get('/', async (req, res) => {
  try {
    const cartItems = await Cart.find({});

    // Calculate the total price on the server
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    res.json({ items: cartItems, total: total.toFixed(2) });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { productId, qty } = req.body;

    // 1. Find the item in our cart
    const existingItem = await Cart.findOne({ productId: productId });

    // 2. If it's already in the cart, update the quantity
    if (existingItem) {
      existingItem.quantity = existingItem.quantity + qty;
      const updatedItem = await existingItem.save();
      res.status(200).json(updatedItem);
    } else {
      // 3. If it's a new item, get its details from the Product collection
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // 4. Create a new cart item
      const newItem = new Cart({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: qty,
      });

      const createdItem = await newItem.save();
      res.status(201).json(createdItem);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});



router.delete('/:id', async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);

    if (cartItem) {
      await cartItem.deleteOne(); 
      res.json({ message: 'Item removed' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});


router.post('/checkout', async (req, res) => {
  try {
    // 1. Get all cart items to calculate the final total
    const cartItems = await Cart.find({});
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // 2. Clear the cart
    await Cart.deleteMany({});

    // 3. Send back a mock receipt
    res.json({
      message: 'Checkout Successful!',
      total: total.toFixed(2),
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;