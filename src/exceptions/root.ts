//message,status,code, error codes

export class HttpException extends Error {
    message: string;
    code: any;
    status: number;
    errors:ErrorCodes
    constructor(message: string, code: ErrorCodes, status: number,error:any) {
        super(message)
        this.message = message;
        this.status = status;
        this.code = code;
        this.errors = error
    }
}

export enum ErrorCodes{
    USER_NOT_FOUND = 101,
    USER_ALREADY_EXISTS = 102,
    INVALID_PASSWORD = 103,
    INVALID_TOKEN = 104,
    UNPROCESSABLE_ENTITY = 105,
    INTERNAL_EXCEPTION = 106,
    TOKEN_NOT_FOUND = 107,
    UNAUTHORIZED=108
}
