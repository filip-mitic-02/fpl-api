export class ErrorResponse { 
    message: string;
    success: false = false;
    
    constructor(message: string){
        this.message = message;
    }
}