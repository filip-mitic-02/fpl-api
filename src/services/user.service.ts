import { inject, injectable } from "tsyringe";
import { UserRepository } from "../repositories";


@injectable()
export class UserService {
    constructor(
        @inject(UserRepository)
        private readonly userRepository: UserRepository,
    ){}
}