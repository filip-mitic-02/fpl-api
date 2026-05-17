import { StatusCode } from '../enums';
import { HttpException } from './';

export class ConflictException extends HttpException {
  constructor(message: string) {
    super(message, StatusCode.CONFLICT);
  }
}
