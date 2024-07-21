import {
  NextFunction,
  Request,
  Response,
} from 'express';

import { Address } from '@prisma/client';

import { prismaClient } from '../';
import { BadRequestException } from '../exceptions/bad-request';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCodes } from '../exceptions/root';
import {
  AddressSchema,
  updateUserSchema,
} from '../schema/users';
import { getUserAuthenticated } from '../utilities/auth.utility';

export const addAddress = async (req: Request, res: Response, next: NextFunction) => {
    let userConnected = await getUserAuthenticated(req);
    AddressSchema.parse(req.body)
    //let user: User;
    if(!userConnected){
        throw new NotFoundException('user not found',ErrorCodes.USER_NOT_FOUND) 
    }
    const address = await prismaClient.address.create({
        data: {
            ...req.body,
            userId:userConnected.id
        }
    });
    res.json(address);
    
}

export const deleteAddress=async (req: Request, res: Response, next: NextFunction) => {
    try{
         await prismaClient.address.delete({
            where: {
                id: +req.params.id
            }
        });
        res.json({message:'Address deleted'});

    }catch(error){
        throw new NotFoundException('Address not found',ErrorCodes.ADDRESS_NOT_FOUND) 
    }
   
}


export const listAddress=async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUserAuthenticated(req);
    if(!user){
        throw new NotFoundException('user not found',ErrorCodes.USER_NOT_FOUND) 
    }
    const addrress = await prismaClient.address.findMany({
        where:{
            userId:user.id
        }
    });
    res.json(addrress);
}

export const updateUser=async(req:Request,res:Response,next:NextFunction)=>{
    const validationData = updateUserSchema.parse(req.body);
    
    const user = await getUserAuthenticated(req);
    let shippingAddress :Address
    let billingAddress :Address
    if(validationData.defaultShippingAddress){
        try{
            shippingAddress = await prismaClient.address.findFirstOrThrow({
                where:{
                   id : validationData.defaultShippingAddress
                }
            });

        }catch(error){
            throw new NotFoundException('address not found',ErrorCodes.ADDRESS_NOT_FOUND)
        }
        if(shippingAddress.userId !== user.id){
            throw new BadRequestException('Address does not belongs to user',ErrorCodes.ADDRESS_DOES_NOT_MATCH)   
        }
    }

    if(validationData.defaultBillingAddress){
        try{
            billingAddress = await prismaClient.address.findFirstOrThrow({
                where:{
                   id : validationData.defaultBillingAddress
                }
            });
           
        }catch(error){
            throw new NotFoundException('address not found',ErrorCodes.ADDRESS_NOT_FOUND)
        }
        if(billingAddress.userId !== user.id){
            throw new BadRequestException('Address does not belongs to user',ErrorCodes.ADDRESS_DOES_NOT_MATCH)   
        }

    }
    
    const updatedUser = await prismaClient.user.update({
        where:{
            id:user.id
        },
        data:validationData
    })
    res.json(updatedUser);
}