import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

import { prismaClient } from '../';
import { ErrorCodes } from '../exceptions/root';
import { UnauthorizedException } from '../exceptions/unauthorized';
import { JWT_SECRET } from '../secret';

export const getUserAuthenticated=async(req:Request)=>{
    const signature = req.headers.authorization;
    if(!signature){
        throw new UnauthorizedException("unauthorized",ErrorCodes.UNAUTHORIZED)
    }
    const payload = jwt.verify(signature!,JWT_SECRET) as any; 
    const user = await prismaClient.user.findFirst({
        where:{id:payload.userId}
    })
    if(!user){
        throw new UnauthorizedException("unauthorized",ErrorCodes.UNAUTHORIZED)
    }
    return user
}