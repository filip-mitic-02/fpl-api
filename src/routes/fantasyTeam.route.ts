import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { FantasyTeamController } from '../controllers';
import {
  AuthenticatedRequest,
  ChipParams,
  CreateFantasyTeamRequest,
  CreateFantasyTeamSchema,
  IdParam,
  IdParamSchema,
  isAuthenticated,
  TransferRequest,
  TransferSchema,
  validateBody,
  validateParams,
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

fantasyTeamRouter.get('/fantasy-teams/:id', isAuthenticated, validateParams(IdParamSchema), (req: Request, res: Response) =>
  fantasyTeamController.getTeamById(req as AuthenticatedRequest<unknown, IdParam>, res),
);

fantasyTeamRouter.patch(
  '/fantasy-teams/:id/transfer',
  isAuthenticated,
  validateParams(IdParamSchema),
  validateBody(TransferSchema),
  (req: Request, res: Response) => fantasyTeamController.transferPlayer(req as AuthenticatedRequest<TransferRequest, IdParam>, res),
);

fantasyTeamRouter.patch(
  '/fantasy-teams/:id/chips/:chipType',
  isAuthenticated,
  validateParams(IdParamSchema),
  (req: Request, res: Response) => fantasyTeamController.activateChip(req as AuthenticatedRequest<unknown, ChipParams>, res),
);

fantasyTeamRouter.patch(
  '/fantasy-teams/:id/wildcard',
  isAuthenticated,
  validateParams(IdParamSchema),
  validateBody(WildcardSchema),
  (req: Request, res: Response) => fantasyTeamController.useWildcard(req as AuthenticatedRequest<CreateFantasyTeamRequest, IdParam>, res),
);

export { fantasyTeamRouter };
