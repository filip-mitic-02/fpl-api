import { StatusCode } from '../enums';
import { HttpException } from './http.exception';

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(message, StatusCode.NOT_FOUND);
  }
}
