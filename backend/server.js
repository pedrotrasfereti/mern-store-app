import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Routes
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();

// To parse JSON request bodies
app.use(express.json());

// To parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/api/products', productRoutes);

app.listen(5000, () => {
  connectDB();
  console.log('Server started at http://localhost:5000');
});
