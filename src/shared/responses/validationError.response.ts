import { StatusCode } from '../enums';
import { ErrorResponse } from './';

export class ValidationErrorResponse extends ErrorResponse {
  errors: { field: string; message: string }[];

  constructor(message: string, errors: { field: string; message: string }[]) {
    super(message, StatusCode.BAD_REQUEST);
    this.errors = errors;
  }
}
