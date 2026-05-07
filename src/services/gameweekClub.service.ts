import { inject, injectable } from "tsyringe";
import { GameweekClubRepository } from "../repositories";


@injectable()
export class GameweekClubService {
    constructor(
        @inject(GameweekClubRepository)
        private readonly gameweekClubRepository: GameweekClubRepository,
    ){}
}