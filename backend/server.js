import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';

// Models
import Product from './models/product.model.js';

dotenv.config();

const app = express();

// To parse JSON request bodies
app.use(express.json());

// To parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

app.get('/api/products', async (_req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ success: true, data: products });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: 'Error retrieving products' });
  }
});

app.post('/api/products', async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all fields',
    });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();

    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Error creating product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: 'Invalid product ID' });
  }

  try {
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Error deleting product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: 'Invalid product ID' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    return res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Error updating product' });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log('Server started at http://localhost:5000');
});
