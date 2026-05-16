export class ErrorResponse {
  success = false as const;

  constructor(public message: string, public statusCode: number) {}
}
