import { Router, Request, Response } from 'express';
import { container } from '../config/container.config';
import { AuthController } from '../controllers';
import { validateBody } from '../shared/middlewares';
import { LoginSchema, RegisterSchema } from '../shared/schemas';

const authRouter = Router();
const authController = container.resolve(AuthController);

authRouter.post('/register', validateBody(RegisterSchema), (req: Request, res: Response) => authController.register(req, res));

authRouter.post('/login', validateBody(LoginSchema), (req: Request, res: Response) => authController.login(req, res));

export { authRouter };
