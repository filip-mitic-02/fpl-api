import { Router, Request, Response } from 'express';
import { ExampleController } from '../controllers/example.controler';
import { container } from '../config/container.config';

const exampleRouter = Router();
const exampleController = container.resolve(ExampleController);

exampleRouter.get('/:id', (req: Request, res: Response) => exampleController.getExampleById(req, res));

export { exampleRouter };
