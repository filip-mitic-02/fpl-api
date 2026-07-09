import { inject, injectable } from 'tsyringe';
import { Response } from 'express';
import { GameweekService } from '../services';
import {
  ApiResponse,
  AuthenticatedRequest,
  CreateGameweekPlayerRequest,
  CreateGameweekRequest,
  GameweekParams,
  IdParam,
  sendResponse,
  StatusCode,
} from '../shared';
import { FantasyTeamGameweekModel, GameweekModel, GameweekPlayerModel } from '../models';

@injectable()
export class GameweekController {
  constructor(
    @inject(GameweekService)
    private readonly gameweekService: GameweekService,
  ) {}

  async createGameweek(req: AuthenticatedRequest<CreateGameweekRequest>, res: Response): Promise<Response<ApiResponse<GameweekModel>>> {
    const gameweek = await this.gameweekService.createGameweek(req.body);
    return sendResponse(res, StatusCode.CREATED, 'Gameweek created successfully.', gameweek);
  }

  async addPlayerStats(
    req: AuthenticatedRequest<CreateGameweekPlayerRequest, IdParam>,
    res: Response,
  ): Promise<Response<ApiResponse<GameweekPlayerModel>>> {
    const playerInGameweek = await this.gameweekService.addPlayerStats(req.params.id, req.body);
    return sendResponse(res, StatusCode.CREATED, 'Player stats created successfully.', playerInGameweek);
  }

  async getTeamByGameweek(
    req: AuthenticatedRequest<unknown, GameweekParams>,
    res: Response,
  ): Promise<Response<ApiResponse<FantasyTeamGameweekModel>>> {
    const gameweekTeam = await this.gameweekService.getTeamByGameweek(req.params.id, req.params.gameweekId);
    return sendResponse(res, StatusCode.OK, 'Fantasy team from certain gameweek retrieved successfully.', gameweekTeam);
  }
}
