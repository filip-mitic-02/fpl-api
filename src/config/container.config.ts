import { container } from 'tsyringe';
import { dataSource } from './database.config';

import { ExampleController } from '../controllers';
import { ExampleService } from '../services/';
import { ExampleRepository } from '../repositories';

// Register TypeORM DataSource singleton
container.registerInstance('DataSource', dataSource);

// Register repositories
container.register(ExampleRepository, {
  useClass: ExampleRepository,
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
