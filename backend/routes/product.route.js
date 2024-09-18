import express from 'express';

// Controllers
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

export default router;
