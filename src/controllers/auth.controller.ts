import { inject, injectable } from 'tsyringe';
import { Response } from 'express';
import { AuthService } from '../services';
import { LoginUserRequest, RegisterUserRequest, StatusCode, sendResponse, TypedRequest, ApiResponse, LoginResponse } from '../shared';
import { UserPublicInfo } from '../models';

@injectable()
export class AuthController {
  constructor(
    @inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  async register(req: TypedRequest<RegisterUserRequest>, res: Response): Promise<Response<ApiResponse<UserPublicInfo>>> {
    const registerResponse = await this.authService.register(req.body);
    return sendResponse(res, StatusCode.CREATED, 'User registered successfully.', registerResponse);
  }

  async login(req: TypedRequest<LoginUserRequest>, res: Response): Promise<Response<ApiResponse<LoginResponse>>> {
    const loginResponse = await this.authService.login(req.body);
    return sendResponse(res, StatusCode.OK, 'User logged in successfully.', loginResponse);
  }
}
