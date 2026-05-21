import { StatusCode } from '../enums';
import { HttpException } from './http.exception';

export class BadRequestException extends HttpException {
  constructor(
    message: string,
    public errors: string[],
  ) {
    super(message, StatusCode.BAD_REQUEST);
  }
}
