export class SuccessResponse<T> {
  success = true as const;

  constructor(
    public statusCode: number,
    public data?: T,
    public message?: string,
  ) {}
}
