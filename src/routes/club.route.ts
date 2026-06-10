import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { ClubController } from '../controllers';
import {
  AuthenticatedRequest,
  CreateClubRequest,
  CreateClubSchema,
  IdParam,
  isAdmin,
  isAuthenticated,
  NoParams,
  SearchQuery,
  validateBody,
} from '../shared';

const clubRouter = Router();
const clubController = container.resolve(ClubController);

clubRouter.post('/clubs', validateBody(CreateClubSchema), isAuthenticated, isAdmin, (req: Request, res: Response) =>
  clubController.createClub(req as AuthenticatedRequest<CreateClubRequest>, res),
);

clubRouter.get('/clubs', isAuthenticated, (req: Request, res: Response) =>
  clubController.findClubs(req as unknown as AuthenticatedRequest<unknown, NoParams, SearchQuery>, res),
);

clubRouter.get('/clubs/:id', isAuthenticated, (req: Request<{ id: string }>, res: Response) =>
  clubController.findById(req as AuthenticatedRequest<unknown, IdParam>, res),
);

clubRouter.delete('/clubs/:id', isAuthenticated, isAdmin, (req: Request<{ id: string }>, res: Response) =>
  clubController.deleteById(req as AuthenticatedRequest<unknown, IdParam>, res),
);

clubRouter.patch('/clubs/:id', isAuthenticated, isAdmin, (req: Request<{ id: string }>, res: Response) =>
  clubController.updateById(req as AuthenticatedRequest<Partial<CreateClubRequest>, IdParam>, res),
);

export { clubRouter };
