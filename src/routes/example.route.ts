import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { ExampleController } from '../controllers/example.controler';
 
const exampleRouter = Router();
const exampleController = container.resolve(ExampleController);

exampleRouter.get('/:id', (req: Request, res: Response) => exampleController.getExampleById(req, res));


export  {exampleRouter};
