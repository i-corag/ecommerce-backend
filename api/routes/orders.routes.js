import { Router } from 'express';
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/orders.controllers.js';

const router = Router();

//CREATE ORDER
router.post('/create', createOrder);

//READ ORDERS
router.get('/', getOrders);

//READ A SPECIFIC ORDER
router.get('/:id', getOrder);

//UPDATE ORDER
router.put('/update/:id', updateOrder);

//DELETE ORDER
router.delete('/delete/:id', deleteOrder);

export default router;
