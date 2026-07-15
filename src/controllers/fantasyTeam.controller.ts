import { Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { FantasyTeamService } from '../services';
import {
  ApiResponse,
  AuthenticatedRequest,
  ChipParams,
  CreateFantasyTeamRequest,
  IdParam,
  sendResponse,
  StatusCode,
  TransferRequest,
} from '../shared';
import { FantasyTeamChipModel, FantasyTeamModel, FantasyTeamWithPlayersModel } from '../models';

@injectable()
export class FantasyTeamController {
  constructor(
    @inject(FantasyTeamService)
    private readonly fantasyTeamService: FantasyTeamService,
  ) {}

  async createFantasyTeam(
    req: AuthenticatedRequest<CreateFantasyTeamRequest>,
    res: Response,
  ): Promise<Response<ApiResponse<FantasyTeamModel>>> {
    const fantasyTeam = await this.fantasyTeamService.createFantasyTeam(req.user.userId, req.body);
    return sendResponse(res, StatusCode.CREATED, 'Fantasy team created successfully.', fantasyTeam);
  }

  async getMyTeam(req: AuthenticatedRequest, res: Response): Promise<Response<ApiResponse<FantasyTeamWithPlayersModel>>> {
    const fantasyTeam = await this.fantasyTeamService.getMyTeam(req.user.userId);
    return sendResponse(res, StatusCode.OK, 'Fantasy team retrieved successfully.', fantasyTeam);
  }

  async getTeamById(
    req: AuthenticatedRequest<unknown, IdParam>,
    res: Response,
  ): Promise<Response<ApiResponse<FantasyTeamWithPlayersModel>>> {
    const fantasyTeam = await this.fantasyTeamService.getTeamById(req.params.id);
    return sendResponse(res, StatusCode.OK, 'Fantasy team retrieved successfully.', fantasyTeam);
  }

  async transferPlayer(
    req: AuthenticatedRequest<TransferRequest, IdParam>,
    res: Response,
  ): Promise<Response<ApiResponse<FantasyTeamWithPlayersModel>>> {
    const fantasyTeam = await this.fantasyTeamService.transferPlayer(req.params.id, req.body);
    return sendResponse(res, StatusCode.OK, 'Transfer made successfully.', fantasyTeam);
  }

  async activateChip(req: AuthenticatedRequest<unknown, ChipParams>, res: Response): Promise<Response<ApiResponse<FantasyTeamChipModel>>> {
    const fantasyTeamChip = await this.fantasyTeamService.activateChip(req.params.id, req.params.chipType, req.user.userId);
    return sendResponse(res, StatusCode.OK, 'Chip activated successfully.', fantasyTeamChip);
  }

  async useWildcard(
    req: AuthenticatedRequest<CreateFantasyTeamRequest, IdParam>,
    res: Response,
  ): Promise<Response<ApiResponse<FantasyTeamModel>>> {
    const fantasyTeam = await this.fantasyTeamService.useWildcard(req.params.id, req.body, req.user.userId);
    return sendResponse(res, StatusCode.OK, 'Wildcard activated successfully.', fantasyTeam);
  }
}
