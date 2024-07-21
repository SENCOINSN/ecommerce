import {
  NextFunction,
  Request,
  Response,
} from 'express';

import { Product } from '@prisma/client';

import { prismaClient } from '../';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCodes } from '../exceptions/root';
import {
  ChangeQuantitySchema,
  CreateCartSchema,
} from '../schema/cart';
import { getUserAuthenticated } from '../utilities/auth.utility';

export const addItemToCart = async (req: Request, res: Response, next: NextFunction) => {
    const validationData = CreateCartSchema.parse(req.body);
    
        //const { productId, quantity } = req.body;
        const user = await getUserAuthenticated(req);
        let product:Product

        if(!user){
            throw new NotFoundException('user not found',ErrorCodes.USER_NOT_FOUND) 
        }

        try{    
            
        product = await prismaClient.product.findFirstOrThrow({ where: { id: validationData.productId } });
      } catch(error){            
        throw new NotFoundException('product not found',ErrorCodes.PRODUCT_NOT_FOUND) 
      }
        const cartItem = await prismaClient.cartItem.create({
            data: {
                quantity: validationData.quantity,
                productId: product.id,
                userId: user.id
            }
        });
        res.json(cartItem);
    
}

export const getCart=async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUserAuthenticated(req);
    if(!user){
        throw new NotFoundException('user not found',ErrorCodes.USER_NOT_FOUND) 
    }
    const cart = await prismaClient.cartItem.findMany({
        where: {
            userId: user.id
        },
        include: {
            product: true
        }
    });
    res.json(cart);
}

export const changeQuantity=async (req: Request, res: Response, next: NextFunction) => {
    const validationData = ChangeQuantitySchema.parse(req.body);
   // const { cartItemId, quantity } = req.body;
    const user = await getUserAuthenticated(req);
    if(!user){
        throw new NotFoundException('user not found',ErrorCodes.USER_NOT_FOUND) 
    }
    const cartItem = await prismaClient.cartItem.update({
        where: {
            id: +req.params.id
        },
        data: {
            quantity: validationData.quantity
        }
    });
    res.json(cartItem);
}


export const deleteCart = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
   
    const user = await getUserAuthenticated(req);
    if(!user){
        throw new NotFoundException('user not found',ErrorCodes.USER_NOT_FOUND) 
    }
    try{
        const cartItem = await prismaClient.cartItem.findFirstOrThrow({
            where: {
                id: +id
            }
        })
    }catch(error){
        throw new NotFoundException('cart item not found',ErrorCodes.CART_ITEM_NOT_FOUND)
    }
    await prismaClient.cartItem.delete({
        where: {
            id: +id
        }
    });
    res.json({message: 'cart item deleted'});
}
