import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers';
import { isAuthenticated } from '../shared/middlewares';
import { AuthenticatedRequest, IdParam, NoParams } from '../shared/types';
import { UserSearchQuery } from '../shared';

const userRouter = Router();
const userController = container.resolve(UserController);

userRouter.get('/me', isAuthenticated, (req: Request, res: Response) => userController.getMe(req as AuthenticatedRequest, res));

userRouter.delete('/users/:id', isAuthenticated, (req: Request<{ id: string }>, res: Response) =>
  userController.deleteUserById(req as AuthenticatedRequest<unknown, IdParam>, res),
);

userRouter.get('/users', isAuthenticated, (req: Request, res: Response) =>
  userController.getUsers(req as unknown as AuthenticatedRequest<unknown, NoParams, UserSearchQuery>, res),
);

export { userRouter };
