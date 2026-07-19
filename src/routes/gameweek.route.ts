import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';
import { GameweekController } from '../controllers';
import {
  AuthenticatedRequest,
  CreateGameweekPlayerRequest,
  CreateGameweekPlayerSchema,
  CreateGameweekRequest,
  CreateGameweekSchema,
  GameweekParams,
  GameweekParamsSchema,
  IdParam,
  IdParamSchema,
  isAdmin,
  isAuthenticated,
  validateBody,
  validateParams,
} from '../shared';

const gameweekRouter = Router();
const gameweekController = container.resolve(GameweekController);

gameweekRouter.post('/gameweeks', isAuthenticated, isAdmin, validateBody(CreateGameweekSchema), (req: Request, res: Response) =>
  gameweekController.createGameweek(req as AuthenticatedRequest<CreateGameweekRequest>, res),
);

gameweekRouter.post(
  '/gameweeks/:id/players',
  isAuthenticated,
  isAdmin,
  validateParams(IdParamSchema),
  validateBody(CreateGameweekPlayerSchema),
  (req: Request, res: Response) =>
    gameweekController.addPlayerStats(req as AuthenticatedRequest<CreateGameweekPlayerRequest, IdParam>, res),
);

gameweekRouter.get(
  '/fantasy-teams/:id/gameweeks/:gameweekId',
  isAuthenticated,
  validateParams(GameweekParamsSchema),
  (req: Request, res: Response) => gameweekController.getTeamByGameweek(req as AuthenticatedRequest<unknown, GameweekParams>, res),
);

export { gameweekRouter };
