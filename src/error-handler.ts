import {
  NextFunction,
  Request,
  Response,
} from 'express';

import { InternalException } from './exceptions/internal-exceptions';
import {
  ErrorCodes,
  HttpException,
} from './exceptions/root';
import { ZodError } from 'zod';
import { BadRequestException } from './exceptions/bad-request';
import { UnProcessableEntityException } from './exceptions/UnprocessableEntity';

export const errorHandler =(method:Function)=>{ 
return async (req:Request,res:Response,next:NextFunction)=>{
    try{
       await method(req,res,next)

    }catch(error:any){
        let exception:HttpException;
        if(error instanceof HttpException){
            exception = error
}else{
    if(error instanceof ZodError){
      exception = new UnProcessableEntityException("Unprocessable entity",ErrorCodes.UNPROCESSABLE_ENTITY,error);
    }else{
      exception = new InternalException("Something went wrong",error,ErrorCodes.INTERNAL_EXCEPTION)
    }

}
next(exception);
}
 }
}