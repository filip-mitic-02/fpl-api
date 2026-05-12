import { inject, injectable } from "tsyringe";
import bcrypt  from 'bcrypt';
import { UserRepository } from "../repositories";
import { User } from "../entities";
import { UserResponse } from "../shared";

@injectable()
export class AuthService {
    constructor(
        @inject(UserRepository)
        private readonly userRepository: UserRepository,
    ){}

    async register(name: string, surname: string, email: string, username: string, password: string, dateOfBirth: Date): Promise<UserResponse>{
        const doesUserExist = await this.userRepository.findByEmailOrUsername(email, username);
        if(doesUserExist){
            throw new Error('User with that email/username already exists.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        return await this.userRepository.createUser(name, surname, email, username, hashedPassword, dateOfBirth);
    }
}