import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { PlayerController } from '../controllers';
import {
  AuthenticatedRequest,
  CreatePlayerRequest,
  CreatePlayerSchema,
  IdParam,
  isAdmin,
  isAuthenticated,
  NoParams,
  PlayerSearchQuery,
  validateBody,
} from '../shared';

const playerRouter = Router();
const playerController = container.resolve(PlayerController);

playerRouter.post('/players', isAuthenticated, validateBody(CreatePlayerSchema), isAdmin, (req: Request, res: Response) =>
  playerController.createPlayer(req as AuthenticatedRequest<CreatePlayerRequest>, res),
);

playerRouter.get('/players', isAuthenticated, (req: Request, res: Response) =>
  playerController.findPlayers(req as unknown as AuthenticatedRequest<unknown, NoParams, PlayerSearchQuery>, res),
);

playerRouter.get('/players/:id', isAuthenticated, (req: Request<{ id: string }>, res: Response) =>
  playerController.findById(req as AuthenticatedRequest<unknown, IdParam>, res),
);

playerRouter.delete('/players/:id', isAuthenticated, isAdmin, (req: Request<{ id: string }>, res: Response) =>
  playerController.deleteById(req as AuthenticatedRequest<unknown, IdParam>, res),
);

playerRouter.patch('/players/:id', isAuthenticated, isAdmin, (req: Request<{ id: string }>, res: Response) =>
  playerController.updateById(req as AuthenticatedRequest<Partial<CreatePlayerRequest>, IdParam>, res),
);

export { playerRouter };
