import { Router } from 'express';

import {
  addItemToCart,
  changeQuantity,
  deleteCart,
  getCart,
} from '../controllers/cart.controller';
import { errorHandler } from '../error-handler';
import authMiddleware from '../middlewares/auth';

const cartRoutes:Router = Router();

cartRoutes.post('/add',[authMiddleware],errorHandler(addItemToCart))
cartRoutes.get('/',[authMiddleware],errorHandler(getCart))
cartRoutes.delete('/:id',[authMiddleware],errorHandler(deleteCart))
cartRoutes.put('/:id',[authMiddleware],errorHandler(changeQuantity))
export default cartRoutes