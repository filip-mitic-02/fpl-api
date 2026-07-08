import { inject, injectable } from 'tsyringe';
import { Response } from 'express';
import { PlayerService } from '../services';
import {
  ApiResponse,
  AuthenticatedRequest,
  CreatePlayerRequest,
  IdParam,
  NoParams,
  PaginatedData,
  PlayerSearchQuery,
  sendResponse,
  StatusCode,
} from '../shared';
import { PlayerModel } from '../models';

@injectable()
export class PlayerController {
  constructor(
    @inject(PlayerService)
    private readonly playerService: PlayerService,
  ) {}

  async createPlayer(req: AuthenticatedRequest<CreatePlayerRequest>, res: Response): Promise<Response<ApiResponse<PlayerModel>>> {
    const player = await this.playerService.createPlayer(req.body);
    return sendResponse(res, StatusCode.CREATED, 'Player created successfully.', player);
  }

  async findPlayers(
    req: AuthenticatedRequest<unknown, NoParams, PlayerSearchQuery>,
    res: Response,
  ): Promise<Response<ApiResponse<PaginatedData<PlayerModel>>>> {
    const listOfPlayers = await this.playerService.findPlayers(req.query);
    return sendResponse(res, StatusCode.OK, 'Players data retrieved successfully.', listOfPlayers);
  }

  async findById(req: AuthenticatedRequest<unknown, IdParam>, res: Response): Promise<Response<ApiResponse<PlayerModel>>> {
    const playerInfo = await this.playerService.findById(req.params.id);
    return sendResponse(res, StatusCode.OK, 'Player retrieved successfully.', playerInfo);
  }

  async deleteById(req: AuthenticatedRequest<unknown, IdParam>, res: Response): Promise<Response<ApiResponse<void>>> {
    await this.playerService.deleteById(req.params.id);
    return sendResponse(res, StatusCode.NO_CONTENT, 'Player deleted successfully.');
  }

  async updateById(
    req: AuthenticatedRequest<Partial<CreatePlayerRequest>, IdParam>,
    res: Response,
  ): Promise<Response<ApiResponse<Partial<PlayerModel>>>> {
    if (Object.keys(req.body).length === 0) {
      return sendResponse(res, StatusCode.OK, 'No fields provided, nothing was updated.', {});
    }
    const updatedPlayerInfo = await this.playerService.updateById(req.params.id, req.body);
    return sendResponse(res, StatusCode.OK, 'Player updated successfully.', updatedPlayerInfo);
  }
}
