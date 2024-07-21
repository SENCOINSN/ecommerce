import {
  NextFunction,
  Request,
  Response,
} from 'express';

import { HttpException } from '../exceptions/root';

export const errorMiddleware=(error:HttpException,req:Request,res:Response,next:NextFunction)=>{
    console.log("error giving here!! "+ error.errors)
    res.status(error.status).json({
        message:error.message,
        code:error.code,
        errors:error.errors
    })
}