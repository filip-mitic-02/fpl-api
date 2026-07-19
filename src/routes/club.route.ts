import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { ClubController } from '../controllers';
import {
  AuthenticatedRequest,
  CreateClubRequest,
  CreateClubSchema,
  IdParam,
  IdParamSchema,
  isAdmin,
  isAuthenticated,
  NoParams,
  SearchQuery,
  validateBody,
  validateParams,
} from '../shared';

const clubRouter = Router();
const clubController = container.resolve(ClubController);

clubRouter.post('/clubs', isAuthenticated, validateBody(CreateClubSchema), isAdmin, (req: Request, res: Response) =>
  clubController.createClub(req as AuthenticatedRequest<CreateClubRequest>, res),
);

clubRouter.get('/clubs', isAuthenticated, (req: Request, res: Response) =>
  clubController.findClubs(req as unknown as AuthenticatedRequest<unknown, NoParams, SearchQuery>, res),
);

clubRouter.get('/clubs/:id', isAuthenticated, validateParams(IdParamSchema), (req: Request, res: Response) =>
  clubController.findById(req as AuthenticatedRequest<unknown, IdParam>, res),
);

clubRouter.delete('/clubs/:id', isAuthenticated, isAdmin, validateParams(IdParamSchema), (req: Request, res: Response) =>
  clubController.deleteById(req as AuthenticatedRequest<unknown, IdParam>, res),
);

clubRouter.patch('/clubs/:id', isAuthenticated, isAdmin, validateParams(IdParamSchema), (req: Request, res: Response) =>
  clubController.updateById(req as AuthenticatedRequest<Partial<CreateClubRequest>, IdParam>, res),
);

export { clubRouter };
