import { Router } from 'express';

import {
  addAddress,
  deleteAddress,
  listAddress,
  updateUser,
} from '../controllers/users.controller';
import { errorHandler } from '../error-handler';
import adminMiddleware from '../middlewares/admin';
import authMiddleware from '../middlewares/auth';

const usersRoutes:Router=Router();

usersRoutes.post('/address',[authMiddleware,adminMiddleware],errorHandler(addAddress))
usersRoutes.delete('/address/:id',[authMiddleware,adminMiddleware],errorHandler(deleteAddress))
usersRoutes.get('/address',[authMiddleware,adminMiddleware],errorHandler(listAddress))
usersRoutes.put('/',[authMiddleware],errorHandler(updateUser))
export default usersRoutes