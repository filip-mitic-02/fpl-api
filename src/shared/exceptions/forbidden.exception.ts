import { StatusCode } from '../enums';
import { HttpException } from './http.exception';

export class ForbiddenException extends HttpException {
  constructor(message: string) {
    super(message, StatusCode.FORBIDDEN);
  }
}
