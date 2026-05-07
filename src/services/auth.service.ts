import { inject, injectable } from "tsyringe";
import { UserRepository } from "../repositories";


@injectable()
export class AuthService {
    constructor(
        @inject(UserRepository)
        private readonly userRepository: UserRepository,
    ){}
}