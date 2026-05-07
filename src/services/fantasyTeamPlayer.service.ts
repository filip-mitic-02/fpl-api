import { inject, injectable } from "tsyringe";
import { FantasyTeamPlayerRepository } from "../repositories";


@injectable()
export class FantasyTeamPlayerService {
    constructor(
        @inject(FantasyTeamPlayerRepository)
        private readonly fantasyTeamPlayerRepository: FantasyTeamPlayerRepository,
    ){}
}