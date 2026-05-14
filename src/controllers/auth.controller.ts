import { inject, injectable } from "tsyringe";
import { Request, Response } from 'express';
import { AuthService } from "../services";
import { HttpException } from "../shared/exceptions";
import { ErrorResponse, SuccessResponse } from "../shared/responses";
import { RegisterUserRequest } from "../shared";

@injectable()
export class AuthController {
    constructor(
        @inject(AuthService)
        private readonly authService: AuthService,
    ){}

    async register(req: Request<{}, {}, RegisterUserRequest>, res: Response): Promise<void> {
        try{
            const registerResponse = await this.authService.register(req.body);
            
            res.status(201).json(new SuccessResponse(registerResponse));
        } catch(error){
            if(error instanceof HttpException){
                res.status(error.statusCode).json(new ErrorResponse(error.message));
                return;
            }

            res.status(500).json(new ErrorResponse('Error while creating user.'));
        }
    };
}