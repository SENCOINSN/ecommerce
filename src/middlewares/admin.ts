import {
    NextFunction,
    Request,
    Response,
  } from 'express';
 
  
  import { ErrorCodes } from '../exceptions/root';
  import { UnauthorizedException } from '../exceptions/unauthorized';
  import { getUserAuthenticated } from '../utilities/auth.utility';
  
  export const adminMiddleware = async(req:Request,res:Response,next:NextFunction)=>{
    const user = await getUserAuthenticated(req)
    if(user.role == 'ADMIN'){
        next()
    }else{
        next(new UnauthorizedException('unauthorized',ErrorCodes.UNAUTHORIZED))
    }      
      
  }
  
  export default adminMiddleware