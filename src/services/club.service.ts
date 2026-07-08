import { inject, injectable } from 'tsyringe';
import { ClubRepository } from '../repositories';
import { ConflictException, CreateClubRequest, NotFoundException, PaginatedData, SearchQuery, validateUuid } from '../shared';
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
    const { limit, offset, search } = searchCriteria;

    const [data, total] = await Promise.all([
      this.clubRepository.findClubs(limit, offset, search),
      this.clubRepository.countClubsBySearch(search),
    ]);

    return { data, total };
  }

  async findById(id: string): Promise<ClubModel> {
    validateUuid(id);
    const targetClub = await this.clubRepository.findById(id);
    if (!targetClub) {
      throw new NotFoundException('Club not found.');
    }

    return targetClub;
  }

  async deleteById(id: string): Promise<void> {
    validateUuid(id);
    const exists = await this.clubRepository.existsById(id);
    if (!exists) {
      throw new NotFoundException('Club not found.');
    }
    await this.clubRepository.deleteById(id);
  }

  async updateById(id: string, updateData: Partial<CreateClubRequest>): Promise<Partial<ClubModel>> {
    validateUuid(id);
    const exists = await this.clubRepository.existsById(id);
    if (!exists) {
      throw new NotFoundException('Club not found.');
    }
    return await this.clubRepository.updateById(id, updateData);
  }
}
