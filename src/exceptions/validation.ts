import { HttpException } from './root';

export class UnprocessableEntityException extends  HttpException{
    constructor(error:any,message:string,errorCodes:number){
        super(message,errorCodes,422,error)
    }
}