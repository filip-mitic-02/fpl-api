import { StatusCode } from '../enums';
import { HttpException } from './http.exception';

export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(message, StatusCode.UNAUTHORIZED);
  }
}
