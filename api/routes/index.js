import { Router } from 'express';
import userRouter from './users.routes.js';
import productsRouter from './products.routes.js';
import categoriesRouter from './categories.routes.js';
import brandsRouter from './brands.routes.js';
import stocksRouter from './stocks.routes.js';
import ordersRouter from './orders.routes.js';
import authRouter from './auth.routes.js';

function routerAPI(app) {
  const router = Router();
  app.use('/api/', router);
  router.use('/users', userRouter);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/brands', brandsRouter);
  router.use('/stocks', stocksRouter);
  router.use('/orders', ordersRouter);
  router.use('/auth', authRouter);
}

export default routerAPI;
