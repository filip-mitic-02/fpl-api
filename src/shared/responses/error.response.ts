export class ErrorResponse {
  message: string;
  success = false as const;
  statusCode: number;

  constructor(message: string, statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
