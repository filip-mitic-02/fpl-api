import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { AuthService } from '../services';
import { HttpException } from '../shared/exceptions';
import { ErrorResponse, SuccessResponse } from '../shared/responses';
import { RegisterUserRequest, StatusCode } from '../shared';

@injectable()
export class AuthController {
  constructor(
    @inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  async register(req: Request<object, object, RegisterUserRequest>, res: Response): Promise<void> {
    try {
      const registerResponse = await this.authService.register(req.body);

      res.send(new SuccessResponse(registerResponse, StatusCode.CREATED));
    } catch (error) {
      if (error instanceof HttpException) {
        res.send(new ErrorResponse(error.message, error.statusCode));
        return;
      }

      res.send(new ErrorResponse('Error while creating user.', StatusCode.SERVER_ERROR));
    }
  }
}
