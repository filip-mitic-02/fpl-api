import { inject, injectable } from "tsyringe";
import bcrypt  from 'bcrypt';
import { UserRepository } from "../repositories";
import { User } from "../entities";
import { RegisterUserRequest, UserResponse } from "../shared";
import { ConflictException } from "../shared/exceptions";

@injectable()
export class AuthService {
    constructor(
        @inject(UserRepository)
        private readonly userRepository: UserRepository,
    ){}

    async register(bodyData: RegisterUserRequest): Promise<UserResponse>{
        const { email, username, password } = bodyData;
        const doesUserExist = await this.userRepository.existsByEmailOrUsername(email, username);
        if(doesUserExist){
            throw new ConflictException('User with that email / username already exists.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {...bodyData, password: hashedPassword};
        return await this.userRepository.createUser(userData);
    }
}