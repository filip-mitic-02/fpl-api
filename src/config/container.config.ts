import { container } from 'tsyringe';
import { dataSource } from './database.config';

import { ExampleController, AuthController, UserController, ClubController, PlayerController, FantasyTeamController } from '../controllers';
import {
  AuthService,
  UserService,
  ChipService,
  ClubService,
  ExampleService,
  FantasyTeamChipService,
  FantasyTeamPlayerService,
  FantasyTeamService,
  GameweekClubService,
  GameweekPlayerService,
  GameweekService,
  PlayerService,
  StadiumService,
} from '../services/';
import {
  ChipRepository,
  ClubRepository,
  ExampleRepository,
  FantasyTeamChipRepository,
  FantasyTeamPlayerRepository,
  FantasyTeamRepository,
  GameweekClubRepository,
  GameweekPlayerRepository,
  GameweekRepository,
  PlayerRepository,
  StadiumRepository,
  UserRepository,
} from '../repositories';

// Register TypeORM DataSource singleton
container.registerInstance('DataSource', dataSource);

// Register repositories
container.register(ExampleRepository, {
  useClass: ExampleRepository,
});

container.register(UserRepository, {
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

container.register(UserService, {
  useClass: UserService,
});

container.register(FantasyTeamService, {
  useClass: FantasyTeamService,
});

container.register(ChipService, {
  useClass: ChipService,
});

container.register(FantasyTeamChipService, {
  useClass: FantasyTeamChipService,
});

container.register(PlayerService, {
  useClass: PlayerService,
});

container.register(ClubService, {
  useClass: ClubService,
});

container.register(GameweekService, {
  useClass: GameweekService,
});

container.register(StadiumService, {
  useClass: StadiumService,
});

container.register(FantasyTeamPlayerService, {
  useClass: FantasyTeamPlayerService,
});

container.register(GameweekPlayerService, {
  useClass: GameweekPlayerService,
});

container.register(GameweekClubService, {
  useClass: GameweekClubService,
});

container.register(AuthService, {
  useClass: AuthService,
});

// Register controllers
container.register(ExampleController, {
  useClass: ExampleController,
});

container.register(AuthController, {
  useClass: AuthController,
});

container.register(UserController, {
  useClass: UserController,
});

container.register(ClubController, {
  useClass: ClubController,
});

container.register(PlayerController, {
  useClass: PlayerController,
});

container.register(FantasyTeamController, {
  useClass: FantasyTeamController,
});

// Export container for resolving dependencies
export { container };
