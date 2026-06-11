import { inject, injectable } from 'tsyringe';
import { ClubService } from '../services';
import { Response } from 'express';
import {
  ApiResponse,
  AuthenticatedRequest,
  CreateClubRequest,
  IdParam,
  NoParams,
  PaginatedData,
  SearchQuery,
  sendResponse,
  StatusCode,
} from '../shared';
import { ClubModel } from '../models';

@injectable()
export class ClubController {
  constructor(
    @inject(ClubService)
    private readonly clubService: ClubService,
  ) {}

  async createClub(req: AuthenticatedRequest<CreateClubRequest>, res: Response): Promise<Response<ApiResponse<ClubModel>>> {
    const club = await this.clubService.createClub(req.body);
    return sendResponse(res, StatusCode.CREATED, 'Club created successfully.', club);
  }

  async findClubs(
    req: AuthenticatedRequest<unknown, NoParams, SearchQuery>,
    res: Response,
  ): Promise<Response<ApiResponse<PaginatedData<ClubModel>>>> {
    const listOfClubs = await this.clubService.findClubs(req.query);
    return sendResponse(res, StatusCode.OK, 'Clubs data retrieved successfully.', listOfClubs);
  }

  async findById(req: AuthenticatedRequest<unknown, IdParam>, res: Response): Promise<Response<ApiResponse<ClubModel>>> {
    const clubInfo = await this.clubService.findById(req.params.id);
    return sendResponse(res, StatusCode.OK, 'Club retrieved successfully.', clubInfo);
  }

  async deleteById(req: AuthenticatedRequest<unknown, IdParam>, res: Response): Promise<Response<ApiResponse<void>>> {
    await this.clubService.deleteById(req.params.id);
    return sendResponse(res, StatusCode.NO_CONTENT, 'Club deleted successfully.');
  }

  async updateById(
    req: AuthenticatedRequest<Partial<CreateClubRequest>, IdParam>,
    res: Response,
  ): Promise<Response<ApiResponse<Partial<ClubModel>>>> {
    if (Object.keys(req.body).length === 0) {
      return sendResponse(res, StatusCode.OK, 'No fields provided, nothing was updated.', {});
    }
    const updatedClubInfo = await this.clubService.updateById(req.params.id, req.body);
    return sendResponse(res, StatusCode.OK, 'Club updated successfully.', updatedClubInfo);
  }
}
