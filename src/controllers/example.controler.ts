import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { ExampleService } from '../services/';

@injectable()
export class ExampleController {
  constructor(
    @inject(ExampleService)
    private readonly exampleService: ExampleService,
  ) {}

  async getExampleById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const example = await this.exampleService.getExampleById(id as string);
      if (!example) {
        res.status(404).json({
          success: false,
          message: 'Example not found',
        });
        return;
      }
      res.json({
        success: true,
        data: example,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching example.',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
