import { HttpException } from "./";

export class ConflictException extends HttpException {
    constructor(message: string){
        super(message, 409);
    }
}