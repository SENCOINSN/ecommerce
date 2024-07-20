import {
  compareSync,
  hashSync,
} from 'bcrypt';
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import * as jwt from 'jsonwebtoken';

import { prismaClient } from '../';
import { BadRequestException } from '../exceptions/bad-request';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCodes } from '../exceptions/root';
import { SignupSchema } from '../schema/users';
import { JWT_SECRET } from '../secret';
import { getUserAuthenticated } from '../utilities/auth.utility';

export const login=async(req:Request,res:Response)=>{
    const {email,password}=req.body

    let user = await prismaClient.user.findFirst({
        where:{
            email
        }
    });

    if(!user){     
       throw new NotFoundException('user not found',ErrorCodes.USER_NOT_FOUND)
    }  
    if(!compareSync(password,user.password)){
        throw new BadRequestException('invalid password',ErrorCodes.INVALID_PASSWORD)
    }

    const token = jwt.sign({
        userId: user.id,
        email: user.email
    },JWT_SECRET)
    
    
   res.json({user,token})
}

export const signup=async (req:Request,res:Response,next:NextFunction)=>{	
    SignupSchema.parse(req.body);
    const {email,password,name}=req.body

    let user = await prismaClient.user.findFirst({
        where:{
            email
        }
    });

    if(user){     
        throw new BadRequestException('user already exists',ErrorCodes.USER_ALREADY_EXISTS)
    }  
    
    user = await prismaClient.user.create({
        data:{
            email,
            password: hashSync(password,10),
            name
        }
    })
   res.json(user)
   
}

export const getProfile=async(req:Request,res:Response)=>{
   //res.json(req.user)

   const user = await getUserAuthenticated(req);

   res.json(user);
}