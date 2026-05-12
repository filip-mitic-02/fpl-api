import { Router, Request, Response } from "express";
import { container } from "../config/container.config";
import { AuthController } from "../controllers";
import { validate } from '../shared/middlewares'
import { RegisterSchema } from "../shared/schemas";

const authRouter = Router();
const authController = container.resolve(AuthController);

authRouter.post('/register', validate(RegisterSchema), (req: Request, res: Response) => authController.register(req, res));

export { authRouter };