import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { AiController } from '../controllers';
import { AuthenticatedRequest, isAuthenticated, NoParams, SuggestPlayersRequest, SuggestPlayersSchema, validateQuery } from '../shared';

const aiRouter = Router();
const aiController = container.resolve(AiController);

aiRouter.get('/suggest-players', isAuthenticated, validateQuery(SuggestPlayersSchema), (req: Request, res: Response) =>
  aiController.suggestPlayers(req as unknown as AuthenticatedRequest<unknown, NoParams, SuggestPlayersRequest>, res),
);

export { aiRouter };
