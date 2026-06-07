import { inject, injectable } from 'tsyringe';
import { UserService } from '../services';
import { Response } from 'express';
import { StatusCode, UserSearchQuery, sendResponse, AuthenticatedRequest, IdParam, NoParams } from '../shared';

@injectable()
export class UserController {
  constructor(
    @inject(UserService)
    private readonly userService: UserService,
  ) {}

  async getMe(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const userInfo = await this.userService.getMe(req.user.userId);
    return sendResponse(res, StatusCode.OK, 'User data retrieved successfully.', userInfo);
  }

  async deleteUserById(req: AuthenticatedRequest<unknown, IdParam>, res: Response): Promise<Response> {
    await this.userService.deleteUserById(req.user, req.params.id);
    return sendResponse(res, StatusCode.NO_CONTENT, 'User deleted successfully.');
  }

  async findUsers(req: AuthenticatedRequest<unknown, NoParams, UserSearchQuery>, res: Response): Promise<Response> {
    const listOfUsers = await this.userService.findUsers(req.query);
    return sendResponse(res, StatusCode.OK, 'Users data retrieved successfully.', listOfUsers);
  }
}
