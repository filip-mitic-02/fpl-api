import { container } from 'tsyringe';
import { dataSource } from './database.config';

import { ExampleController } from '../controllers';
import { ExampleService } from '../services/';
import { ChipRepository, ClubRepository, ExampleRepository, FantasyTeamChipRepository, FantasyTeamPlayerRepository, FantasyTeamRepository, GameweekClubRepository, GameweekPlayerRepository, GameweekRepository, PlayerRepository, StadiumRepository, UserRepository } from '../repositories';

// Register TypeORM DataSource singleton
container.registerInstance('DataSource', dataSource);

// Register repositories
container.register(ExampleRepository, {
  useClass: ExampleRepository,
});

container.register( UserRepository, {
  useClass: UserRepository,
});

container.register(FantasyTeamRepository, {
  useClass: FantasyTeamRepository,
});

container.register(ChipRepository, {
  useClass: ChipRepository,
});

container.register(FantasyTeamChipRepository, {
  useClass: FantasyTeamChipRepository,
});

container.register(PlayerRepository, {
  useClass: PlayerRepository,
});

container.register(ClubRepository, {
  useClass: ClubRepository,
});

container.register(GameweekRepository, {
  useClass: GameweekRepository,
});

container.register(FantasyTeamPlayerRepository, {
  useClass: FantasyTeamPlayerRepository,
});

container.register(GameweekClubRepository, {
  useClass: GameweekClubRepository,
});

container.register(GameweekPlayerRepository, {
  useClass: GameweekPlayerRepository,
});

container.register(StadiumRepository, {
  useClass: StadiumRepository,
});

// Register services
container.register(ExampleService, {
  useClass: ExampleService,
});

// Register controllers
container.register(ExampleController, {
  useClass: ExampleController,
});

// Export container for resolving dependencies
export { container };
