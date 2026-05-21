export class HttpException extends Error {
  readonly trace: string | undefined;

  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.trace = this.stack;
  }
}
