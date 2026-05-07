import { inject, injectable } from "tsyringe";
import { StadiumRepository } from "../repositories";


@injectable()
export class StadiumService {
    constructor(
        @inject(StadiumRepository)
        private readonly stadiumRepository: StadiumRepository,
    ){}
}