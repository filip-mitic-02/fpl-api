import { Response } from 'express';
import { SuccessResponse, ErrorResponse } from './';

export function sendResponse(res: Response, responseType: SuccessResponse<unknown> | ErrorResponse) {
  const { statusCode, success, ...rest } = responseType;
  res.status(statusCode).json({
    success,
    ...rest,
  });
}
