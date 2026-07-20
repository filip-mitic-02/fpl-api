import { inject, injectable } from 'tsyringe';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories';
import { LoginResponse, LoginUserRequest, RegisterUserRequest, ConflictException, UnauthorizedException, BadRequestException, GoogleUserInfo, GoogleTokenResponse } from '../shared';
import { envConfig } from '../config';
import { UserPublicInfo } from '../models';

@injectable()
export class AuthService {
  constructor(
    @inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async register(bodyData: RegisterUserRequest): Promise<UserPublicInfo> {
    const { email, username, password } = bodyData;
    const doesUserExist = await this.userRepository.existsByEmailOrUsername(email, username);
    if (doesUserExist) {
      throw new ConflictException('User with that email / username already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { ...bodyData, password: hashedPassword };
    return await this.userRepository.createUser(userData);
  }

  async login(loginRequest: LoginUserRequest): Promise<LoginResponse> {
    const { email, password } = loginRequest;
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    if (!user.password) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const accessToken = jwt.sign({ userId: user.id, role: user.role }, envConfig.JWT_SECRET, { expiresIn: '15m' });

    return { accessToken };
  }

  async googleAuth(code: string): Promise<LoginResponse> {
    if (!code) {
        throw new BadRequestException('Authorization code is missing.');
    }

    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            code,
            client_id: envConfig.GOOGLE_CLIENT_ID,
            client_secret: envConfig.GOOGLE_CLIENT_SECRET,
            redirect_uri: envConfig.GOOGLE_CALLBACK_URL,
            grant_type: 'authorization_code',
        }),
    });

    const tokenData = await tokenResponse.json() as GoogleTokenResponse;

    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const googleUser = await userInfoResponse.json() as GoogleUserInfo;

    let user = await this.userRepository.findByGoogleId(googleUser.id);

    const username = googleUser.email.split('@')[0];
    
    if (!user) {
        user = await this.userRepository.createGoogleUser(googleUser.id, googleUser.email, googleUser.name, username);
    }

    const accessToken = jwt.sign({ userId: user.id, role: user.role }, envConfig.JWT_SECRET, { expiresIn: '15m' });

    return { accessToken };
  }
}
