export class HttpException extends Error {
  statusCode: number;
  trace: string | undefined;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.trace = this.stack;
  }
}
