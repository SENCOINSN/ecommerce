import { Router } from 'express';

import {
  cancelOrder,
  createOrder,
  getOrderById,
  listOrders,
} from '../controllers/order.controller';
import { errorHandler } from '../error-handler';
import authMiddleware from '../middlewares/auth';

const orderRoutes:Router = Router();

orderRoutes.post('/',[authMiddleware],errorHandler(createOrder))
orderRoutes.get('/',[authMiddleware],errorHandler(listOrders))
orderRoutes.put('/:id',[authMiddleware],errorHandler(cancelOrder))
orderRoutes.get('/:id',[authMiddleware],errorHandler(getOrderById))

export default orderRoutes