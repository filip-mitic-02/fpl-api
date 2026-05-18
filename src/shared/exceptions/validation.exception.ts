import { StatusCode } from '../enums';
import { HttpException } from './http.exception';

export class ValidationException extends HttpException {
  constructor(
    message: string,
    public errors: { field: string; message: string }[],
  ) {
    super(message, StatusCode.BAD_REQUEST);
  }
}
