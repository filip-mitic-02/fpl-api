import { inject, injectable } from 'tsyringe';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories';
import { LoginUserRequest, LoginUserResponse, RegisterUserRequest, RegisterUserResponse } from '../shared';
import { ConflictException } from '../shared/exceptions';
import { UnauthorizedException } from '../shared/exceptions/unauthorized.exception';
import { envConfig } from '../config';

@injectable()
export class AuthService {
  constructor(
    @inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async register(bodyData: RegisterUserRequest): Promise<RegisterUserResponse> {
    const { email, username, password } = bodyData;
    const doesUserExist = await this.userRepository.existsByEmailOrUsername(email, username);
    if (doesUserExist) {
      throw new ConflictException('User with that email / username already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { ...bodyData, password: hashedPassword };
    return await this.userRepository.createUser(userData);
  }

  async login(loginData: LoginUserRequest): Promise<LoginUserResponse> {
    const { email, password } = loginData;
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const accessToken = jwt.sign({ userId: user.id, role: user.role }, envConfig.JWT_SECRET, { expiresIn: '15m' });

    return { id: user.id, username: user.username, role: user.role, accessToken };
  }
}
