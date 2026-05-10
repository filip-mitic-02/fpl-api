import { inject, injectable } from "tsyringe";
import { GameweekRepository } from "../repositories";


@injectable()
export class GameweekService {
    constructor(
        @inject(GameweekRepository)
        private readonly gameweekRepository: GameweekRepository,
    ){}
}