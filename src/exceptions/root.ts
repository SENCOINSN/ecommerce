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
    UNAUTHORIZED=108,
    PRODUCT_NOT_FOUND=109,
    ADDRESS_NOT_FOUND=110,
    ADDRESS_DOES_NOT_MATCH=111,
    CART_ITEM_NOT_FOUND=112,
    CART_ITEM_NOT_BELONGS_TO_USER=113
}
