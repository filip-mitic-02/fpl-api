import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { AuthService } from '../services';
import { sendResponse } from '../shared/responses';
import { RegisterUserRequest, StatusCode } from '../shared';

@injectable()
export class AuthController {
  constructor(
    @inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  async register(req: Request<object, object, RegisterUserRequest>, res: Response): Promise<Response> {
    const registerResponse = await this.authService.register(req.body);
    return sendResponse(res, StatusCode.CREATED, 'User registered successfully.', registerResponse);
  }
}
