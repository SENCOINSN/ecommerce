import { Router } from 'express';

import {
  getProfile,
  login,
  signup,
} from '../controllers/auth.controller';
import { errorHandler } from '../error-handler';
import authMiddleware from '../middlewares/auth';

const authRoutes: Router = Router();

authRoutes.post("/login",errorHandler(login));
authRoutes.post("/signup",errorHandler(signup));
authRoutes.get('/profile',[authMiddleware],errorHandler(getProfile))

export default authRoutes;