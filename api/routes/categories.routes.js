import { Router } from 'express';
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categories.controllers.js';

const router = Router();

//CREATE CATEGORY
router.post('/create', createCategory);

//READ CATEGORIES
router.get('/', getCategories);

//READ A SPECIFIC CATEGORY
router.get('/:id', getCategory);

//UPDATE CATEGORY
router.put('/update/:id', updateCategory);

//DELETE CATEGORY
router.delete('/delete/:id', deleteCategory);

export default router;
