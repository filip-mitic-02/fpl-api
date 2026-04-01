import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';

@injectable()
export class ExampleRepository {
    //private repository: Repository<Exmaple>;

    constructor() {
        //this.repository = AppDataSource.getRepository(User);
    }

    async findById(id:string): Promise<string> {
        return 'Example.';
    }
}