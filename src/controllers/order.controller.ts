import {
  NextFunction,
  Request,
  Response,
} from 'express';

import { prismaClient } from '../';
import { getUserAuthenticated } from '../utilities/auth.utility';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    // create transaction
    // to list all cart items and proceed if cart is not empty
    //CALCULATE TOTAL AMOUNT
    //fetch address of user
    //define computed fields for formatted address on address mobile
    //create order
    //create event
    //empty cart
    
    const user = await getUserAuthenticated(req);

    return await prismaClient.$transaction(async (tx) => {
        const cartItems = await tx.cartItem.findMany({
            where: {
                userId: user.id
            },
            include: {
                product: true
            }
        })
        if(cartItems.length === 0) {        
            return res.json({message: 'Cart is empty'})           

        }
        const price = cartItems.reduce((acc, item) => {
            return acc + (+item.product.price * item.quantity)
        }, 0)


        if(!user.defaultShippingAddress) {
            throw new Error('No default shipping address')  
        }    

        const address = await tx.address.findFirstOrThrow({
            where: {
                id: user.defaultShippingAddress
            }
        })
        if(address.userId !== user.id) {
            throw new Error('Address does not belongs to user')
        }
        const order = await tx.order.create({
            data: {
                userId: user.id,
                netAmount: price,
                address:address.formattedAddress,
                products:{
                    create: cartItems.map(item => {
                        return {
                            quantity: item.quantity,
                            productId: item.productId
                        }
                    })
                }
            }
        })

       const orderEvent = await tx.orderEvent.create({
           data: {
               orderId: order.id
           }
       })
       await tx.cartItem.deleteMany({
           where: {
               userId: user.id
           }
       })
       return res.json(order)

    })

    
}

export const listOrders = async (req: Request, res: Response, next: NextFunction) => {
   
}

export const cancelOrder = async (req: Request, res: Response, next: NextFunction) => {
   
}

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
   
}