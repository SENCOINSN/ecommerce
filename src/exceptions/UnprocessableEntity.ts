import { HttpException } from "./root";

export class UnProcessableEntityException extends HttpException{

    constructor(message:string,errorCodes:number,error:any){    
        super(message,errorCodes,422,error)
        this.name = 'UnProcessableEntityException';
    }
}