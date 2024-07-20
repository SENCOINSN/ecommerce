import {
  NextFunction,
  Request,
  Response,
} from 'express';
import * as jwt from 'jsonwebtoken';

import { prismaClient } from '../';
import { ErrorCodes } from '../exceptions/root';
import { UnauthorizedException } from '../exceptions/unauthorized';
import { JWT_SECRET } from '../secret';

export const authMiddleware = async(req:Request,res:Response,next:NextFunction)=>{
  
    const token = req.headers.authorization;
    if(!token){
        //throw new NotFoundException('token not found',ErrorCodes.TOKEN_NOT_FOUND)
      next(new UnauthorizedException('unauthorized',ErrorCodes.UNAUTHORIZED))
    }
    try{
        const payload = jwt.verify(token!,JWT_SECRET) as any;

        const user = await prismaClient.user.findFirst({
            where:{id:payload.userId}
        })

        if(!user){
            next(new UnauthorizedException('unauthorized',ErrorCodes.UNAUTHORIZED))
        }
        //req.user = user;
        next();
    }catch(error){
        next(new UnauthorizedException('invalid token',ErrorCodes.UNAUTHORIZED))
    }

 
    
}

export default authMiddleware;