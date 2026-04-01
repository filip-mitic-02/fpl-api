import { container } from 'tsyringe';
import { ExampleRepository } from '../repositories/example.repository';
import { ExampleService } from '../services/example.service';


export const setupContainer = () => {
  // ===== EXAMPLE MODULE =====
  container.register<ExampleRepository>(ExampleRepository, {
    useClass: ExampleRepository,
  });

  container.register<ExampleService>(ExampleService, {
    useClass: ExampleService,
  });

};