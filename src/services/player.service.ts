import { inject, injectable } from "tsyringe";
import { PlayerRepository } from "../repositories";


@injectable()
export class PlayerService {
    constructor(
        @inject(PlayerRepository)
        private readonly playerRepository: PlayerRepository,
    ){}
}