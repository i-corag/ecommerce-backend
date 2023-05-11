import { Router } from 'express';
import {
  createStock,
  getStocks,
  getStock,
  updateStock,
  deleteStock,
} from '../controllers/stocks.controllers.js';

const router = Router();

//CREATE STOCK
router.post('/create', createStock);

//READ STOCKS
router.get('/', getStocks);

//READ A SPECIFIC STOCK
router.get('/:id', getStock);

//UPDATE STOCK
router.put('/update/:id', updateStock);

//DELETE STOCK
router.delete('/delete/:id', deleteStock);

export default router;
