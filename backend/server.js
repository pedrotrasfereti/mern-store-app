import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Routes
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// To parse JSON request bodies
app.use(express.json());

// To parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log('Server started at http://localhost:5000');
});
