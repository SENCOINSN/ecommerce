import { Router } from "express";
import { errorHandler } from "../error-handler";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/product.controller";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";

const productsRoutes:Router=Router();

productsRoutes.post('/',[authMiddleware,adminMiddleware],errorHandler(createProduct))

productsRoutes.put('/:id',[authMiddleware,adminMiddleware],errorHandler(updateProduct))

productsRoutes.delete('/:id',[authMiddleware,adminMiddleware],errorHandler(deleteProduct))

productsRoutes.get('/:id',[authMiddleware,adminMiddleware],errorHandler(getProductById))

productsRoutes.get('/',[authMiddleware,adminMiddleware],errorHandler(getProducts))
export default productsRoutes