import { StatusCode } from '../enums';
import { ErrorResponse } from './';

export class ValidationErrorResponse extends ErrorResponse {

  constructor(message: string, public errors: { field: string; message: string }[]) {
    super(message, StatusCode.BAD_REQUEST);
  }
}
