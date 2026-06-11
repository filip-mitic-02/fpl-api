import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../repositories';
import { UserPublicInfo } from '../models';
import { JwtPayload, PaginatedData, Role, SearchQuery, BadRequestException, ForbiddenException, NotFoundException } from '../shared';

@injectable()
export class UserService {
  constructor(
    @inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async getMe(userId: string): Promise<UserPublicInfo> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async deleteUserById(requester: JwtPayload, targetId: string): Promise<void> {
    const targetRole = await this.userRepository.findRoleById(targetId);
    if (!targetRole) {
      throw new NotFoundException('User not found.');
    }

    if (requester.userId !== targetId && requester.role === Role.REGULAR) {
      throw new ForbiddenException('You are not authorized to do that.');
    }

    if (targetRole === Role.ADMIN && (await this.userRepository.countAdmins()) === 1) {
      throw new BadRequestException('Can not delete last admin.');
    }

    await this.userRepository.deleteById(targetId);
  }

  async findUsers(searchCriteria: SearchQuery): Promise<PaginatedData<UserPublicInfo>> {
    const { limit, offset, search } = searchCriteria;

    const [data, total] = await Promise.all([
      this.userRepository.findUsers(limit, offset, search),
      this.userRepository.countUsersBySearch(search),
    ]);

    return { data, total };
  }
}
