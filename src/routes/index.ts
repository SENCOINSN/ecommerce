import { Router } from 'express';

import authRoutes from './auth';
import cartRoutes from './cart';
import orderRoutes from './order';
import productsRoutes from './product';
import usersRoutes from './users';

const rootRouter : Router = Router();

rootRouter.use('/auth',authRoutes)
rootRouter.use('/products',productsRoutes)
rootRouter.use('/users',usersRoutes)
rootRouter.use('/cart',cartRoutes)
rootRouter.use('/orders',orderRoutes)



export default rootRouter;