import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { AuthService } from '../services';
import { LoginUserRequest, RegisterUserRequest, StatusCode, sendResponse, TypedRequest, ApiResponse, LoginResponse, GOOGLE_AUTH_BASE_URL, GoogleCallbackQuery } from '../shared';
import { UserPublicInfo } from '../models';
import { envConfig } from '../config';

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

  async googleLogin(req: Request, res: Response): Promise<void> {
    const googleAuthUrl = `${GOOGLE_AUTH_BASE_URL}?client_id=${envConfig.GOOGLE_CLIENT_ID}&redirect_uri=${envConfig.GOOGLE_CALLBACK_URL}&response_type=code&scope=openid email profile`;
    res.redirect(googleAuthUrl);
  }

  async googleCallback(req: TypedRequest<unknown, Record<string, never>, GoogleCallbackQuery>, res: Response): Promise<Response<ApiResponse<LoginResponse>>> {
    const loginResponse = await this.authService.googleAuth(req.query.code);
    return sendResponse(res, StatusCode.OK, 'Logged in successfully.', loginResponse);
  }
}
