import { inject, injectable } from 'tsyringe';
import { ClubRepository, PlayerRepository } from '../repositories';
import { CreatePlayerRequest, NotFoundException, PaginatedData, PlayerSearchQuery } from '../shared';
import { PlayerModel } from '../models';

@injectable()
export class PlayerService {
  constructor(
    @inject(PlayerRepository)
    private readonly playerRepository: PlayerRepository,
    @inject(ClubRepository)
    private readonly clubRepository: ClubRepository,
  ) {}

  async createPlayer(playerInfo: CreatePlayerRequest): Promise<PlayerModel> {
    const { clubId } = playerInfo;
    const doesClubExist = await this.clubRepository.existsById(clubId);
    if (!doesClubExist) {
      throw new NotFoundException('Club with that Id does not exist.');
    }

    return await this.playerRepository.createPlayer(playerInfo);
  }

  async findPlayers(searchCriteria: PlayerSearchQuery): Promise<PaginatedData<PlayerModel>> {
    const [data, total] = await Promise.all([
      this.playerRepository.findPlayers(searchCriteria),
      this.playerRepository.countPlayersBySearch(searchCriteria),
    ]);

    return { data, total };
  }

  async findById(id: string): Promise<PlayerModel> {
    const targetPlayer = await this.playerRepository.findById(id);
    if (!targetPlayer) {
      throw new NotFoundException('Player not found.');
    }

    return targetPlayer;
  }

  async deleteById(id: string): Promise<void> {
    const exists = await this.playerRepository.existsById(id);
    if (!exists) {
      throw new NotFoundException('Player not found.');
    }
    await this.playerRepository.deleteById(id);
  }

  async updateById(id: string, updateData: Partial<CreatePlayerRequest>): Promise<Partial<PlayerModel>> {
    const exists = await this.playerRepository.existsById(id);
    if (!exists) {
      throw new NotFoundException('Player not found.');
    }
    return await this.playerRepository.updateById(id, updateData);
  }
}
