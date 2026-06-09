import { inject, injectable } from 'tsyringe';
import { ClubRepository } from '../repositories';
import { ConflictException, CreateClubRequest, NotFoundException, PaginatedData, SearchQuery, UpdateClubRequest } from '../shared';
import { ClubModel } from '../models';

@injectable()
export class ClubService {
  constructor(
    @inject(ClubRepository)
    private readonly clubRepository: ClubRepository,
  ) {}

  async createClub(clubInfo: CreateClubRequest): Promise<ClubModel> {
    const { name, initials } = clubInfo;
    const doesClubExist = await this.clubRepository.existsByName(name);
    if (doesClubExist) {
      throw new ConflictException('Club with that name already exists.');
    }

    return await this.clubRepository.createClub(name, initials);
  }

  async findClubs(searchCriteria: SearchQuery): Promise<PaginatedData<ClubModel>> {
    const { limit = '10', offset = '0', search = '' } = searchCriteria;
    const limitNum = Number(limit);
    const offsetNum = Number(offset);

    const [data, total] = await Promise.all([
      this.clubRepository.findClubs(limitNum, offsetNum, search),
      this.clubRepository.countClubs(search),
    ]);

    return { data, total };
  }

  async findById(id: string): Promise<ClubModel> {
    const targetClub = await this.clubRepository.findById(id);
    if (!targetClub) {
      throw new NotFoundException('Club not found.');
    }

    return targetClub;
  }

  async deleteById(id: string): Promise<void> {
    await this.findById(id);
    await this.clubRepository.deleteById(id);
  }

  async updateById(id: string, updateData: UpdateClubRequest): Promise<ClubModel> {
    const targetClub = await this.findById(id);

    const name = updateData.name ?? targetClub.name;
    const initials = updateData.initials ?? targetClub.initials;
    return await this.clubRepository.updateById(id, name, initials);
  }
}
