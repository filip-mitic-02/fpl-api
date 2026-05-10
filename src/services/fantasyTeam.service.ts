import { inject, injectable } from "tsyringe";
import { FantasyTeamRepository } from "../repositories";


@injectable()
export class FantasyTeamService {
    constructor(
        @inject(FantasyTeamRepository)
        private readonly fantasyTeamRepository: FantasyTeamRepository,
    ){}
}