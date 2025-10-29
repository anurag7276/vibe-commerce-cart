import connectDB from './config/db.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();
// Connect to MongoDB
connectDB();



// Initialize our Express app
const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello from Vibe Commerce API!');
});


app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);


app.listen(PORT, () => {
  console.log(`Server is running successfully on http://localhost:${PORT}`);
});