import { inject, injectable } from "tsyringe";
import { Request, Response } from 'express';
import { AuthService } from "../services";

@injectable()
export class AuthController {
    constructor(
        @inject(AuthService)
        private readonly authService: AuthService,
    ){}

    async register(req: Request, res: Response): Promise<void> {
        try{
            const {name, surname, email, username, password, dateOfBirth} = req.body;
            const registerResponse = await this.authService.register(name, surname, email, username, password, dateOfBirth);
            
            res.status(201).json({
                success: true,
                data: registerResponse
            });
        } catch(error){
            if(error instanceof Error && error.message === 'User with that email/username already exists.'){
                res.status(409).json({
                    success: false,
                    message: 'User with that email/username already exists.'
                });
                return;
            }

            res.status(500).json({
                success: false,
                message: 'Error while creating user.'
            });
        }
    };
}