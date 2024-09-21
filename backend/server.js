import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db.js';

// Routes
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// To parse JSON request bodies
app.use(express.json());

// To parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/api/products', productRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log('Server started at http://localhost:5000');
});
