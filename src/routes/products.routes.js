import { Router } from 'express';
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/products.controllers.js';

const router = Router();

//CREATE PRODUCT
router.post('/create', createProduct);

//READ PRODUCTS
router.get('/', getProducts);

//READ A SPECIFIC PRODUCT
router.get('/:id', getProduct);

//UPDATE PRODUCT
router.put('/update/:id', updateProduct);

//DELETE PRODUCT
router.delete('/delete/:id', deleteProduct);

export default router;
