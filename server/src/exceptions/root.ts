// message, status code, error codes, error

export class HttpException extends Error {
    message: string;
    errorCode: any;
    statusCode: number;
    errors: ErrorCode;

    constructor(message:string, errorCode: ErrorCode, statusCode:number, error: any) {
        super(message)
        this.message = message
        this.errorCode = errorCode
        this.statusCode = statusCode
        this.errors = error
    }
}

export enum ErrorCode {
    INTERNAL_EXCEPTION= 3001,
    LIGHT_NOT_FOUND = 5001,
    SCHEDULE_NOT_FOUND  = 5002,
    UNPROCESSABLE_ENTITY = 2001
}