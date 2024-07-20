import {
  ErrorCodes,
  HttpException,
} from './root';

export class UnauthorizedException extends HttpException {
        constructor(message: string,errorCode:ErrorCodes) {
            super(message,errorCode,403,null);
            this.name = 'UnauthorizedException';
        }
    }