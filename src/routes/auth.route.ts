import { Router, Request, Response } from 'express';
import { container } from '../config/container.config';
import { AuthController } from '../controllers';
import { validateBody, LoginSchema, RegisterSchema, TypedRequest, RegisterUserRequest, LoginUserRequest, GoogleCallbackQuery } from '../shared';

const authRouter = Router();
const authController = container.resolve(AuthController);

authRouter.post('/register', validateBody(RegisterSchema), (req: Request, res: Response) =>
  authController.register(req as TypedRequest<RegisterUserRequest>, res),
);

authRouter.post('/login', validateBody(LoginSchema), (req: Request, res: Response) =>
  authController.login(req as TypedRequest<LoginUserRequest>, res),
);

authRouter.get('/google', (req: Request, res: Response) =>
  authController.googleLogin(req, res),
);

authRouter.get('/google/callback', (req: Request, res: Response) =>
  authController.googleCallback(req as unknown as TypedRequest<unknown, Record<string, never>, GoogleCallbackQuery>, res),
);

export { authRouter };
