import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { FantasyTeamController } from '../controllers';
import {
  AuthenticatedRequest,
  ChipParams,
  CreateFantasyTeamRequest,
  CreateFantasyTeamSchema,
  IdParam,
  isAuthenticated,
  TransferRequest,
  TransferSchema,
  validateBody,
  WildcardSchema,
} from '../shared';

const fantasyTeamRouter = Router();
const fantasyTeamController = container.resolve(FantasyTeamController);

fantasyTeamRouter.post('/fantasy-teams', validateBody(CreateFantasyTeamSchema), isAuthenticated, (req: Request, res: Response) =>
  fantasyTeamController.createFantasyTeam(req as AuthenticatedRequest<CreateFantasyTeamRequest>, res),
);

fantasyTeamRouter.get('/fantasy-teams/my', isAuthenticated, (req: Request, res: Response) =>
  fantasyTeamController.getMyTeam(req as AuthenticatedRequest, res),
);

fantasyTeamRouter.get('/fantasy-teams/:id', isAuthenticated, (req: Request, res: Response) =>
  fantasyTeamController.getTeamById(req as AuthenticatedRequest<unknown, IdParam>, res),
);

fantasyTeamRouter.patch('/fantasy-teams/:id/transfer', isAuthenticated, validateBody(TransferSchema), (req: Request, res: Response) =>
  fantasyTeamController.transferPlayer(req as AuthenticatedRequest<TransferRequest, IdParam>, res),
);

fantasyTeamRouter.patch('/fantasy-teams/:id/chips/:chipType', isAuthenticated, (req: Request, res: Response) =>
  fantasyTeamController.activateChip(req as AuthenticatedRequest<unknown, ChipParams>, res),
);

fantasyTeamRouter.patch('/fantasy-teams/:id/wildcard', isAuthenticated, validateBody(WildcardSchema), (req: Request, res: Response) =>
  fantasyTeamController.useWildcard(req as AuthenticatedRequest<CreateFantasyTeamRequest, IdParam>, res),
);

export { fantasyTeamRouter };
