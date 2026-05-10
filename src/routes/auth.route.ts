import { Router } from "express";
import { container } from "../config/container.config";
import { AuthController } from "../controllers";


const authRouter = Router();
const authController = container.resolve(AuthController);



export { authRouter };