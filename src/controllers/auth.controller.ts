import { inject, injectable } from 'tsyringe';
import { Response } from 'express';
import { AuthService } from '../services';
import { LoginUserRequest, RegisterUserRequest, StatusCode, sendResponse, TypedRequest } from '../shared';

@injectable()
export class AuthController {
  constructor(
    @inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  async register(req: TypedRequest<RegisterUserRequest>, res: Response): Promise<Response> {
    const registerResponse = await this.authService.register(req.body);
    return sendResponse(res, StatusCode.CREATED, 'User registered successfully.', registerResponse);
  }

  async login(req: TypedRequest<LoginUserRequest>, res: Response): Promise<Response> {
    const loginResponse = await this.authService.login(req.body);
    return sendResponse(res, StatusCode.OK, 'User logged in successfully.', loginResponse);
  }
}
