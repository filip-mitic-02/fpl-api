export class SuccessResponse<T> {
  constructor(data: T, statusCode: number) {
    this.data = data;
    this.statusCode = statusCode;
  }

  data: T;
  success = true as const;
  statusCode: number;
}
