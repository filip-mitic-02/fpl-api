import { inject, injectable } from "tsyringe";
import { AuthService } from "../services";


@injectable()
export class AuthController {
    constructor(
        @inject(AuthService)
        private readonly authService: AuthService,
    ){}
}