export class SuccessResponse<T> {
  success = true as const;
  
  constructor(public data: T, public statusCode: number) {}
}
