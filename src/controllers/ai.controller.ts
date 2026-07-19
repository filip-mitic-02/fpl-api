import { inject, injectable } from 'tsyringe';
import { Response } from 'express';
import { AiService } from '../services';
import { ApiResponse, AuthenticatedRequest, NoParams, PlayerSuggestion, sendResponse, StatusCode, SuggestPlayersRequest } from '../shared';

@injectable()
export class AiController {
  constructor(
    @inject(AiService)
    private readonly aiService: AiService,
  ) {}

  async suggestPlayers(
    req: AuthenticatedRequest<unknown, NoParams, SuggestPlayersRequest>,
    res: Response,
  ): Promise<Response<ApiResponse<PlayerSuggestion[]>>> {
    const aiResponse = await this.aiService.suggestPlayers(req.query);
    return sendResponse(res, StatusCode.OK, 'Response generated successfully.', aiResponse);
  }
}
