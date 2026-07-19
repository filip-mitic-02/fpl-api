import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers';
import { SearchQuery, isAuthenticated, AuthenticatedRequest, IdParam, NoParams, validateParams, IdParamSchema } from '../shared';

const userRouter = Router();
const userController = container.resolve(UserController);

userRouter.get('/me', isAuthenticated, (req: Request, res: Response) => userController.getMe(req as AuthenticatedRequest, res));

userRouter.delete('/users/:id', isAuthenticated, validateParams(IdParamSchema), (req: Request, res: Response) =>
  userController.deleteUserById(req as AuthenticatedRequest<unknown, IdParam>, res),
);

userRouter.get('/users', isAuthenticated, (req: Request, res: Response) =>
  userController.findUsers(req as unknown as AuthenticatedRequest<unknown, NoParams, SearchQuery>, res),
);

export { userRouter };
