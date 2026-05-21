import { Response } from 'express';
import { ApiResponse } from '../interfaces';

export function sendResponse<T>(res: Response, statusCode: number, message: string, data?: T, errors?: string[]): Response<ApiResponse<T>> {
  const response: ApiResponse<T> = {
    success: statusCode < 400,
    message,
    data,
    errors,
  };

  return res.status(statusCode).json(response);
}
