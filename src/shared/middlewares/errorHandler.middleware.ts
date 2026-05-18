import { Request, Response, NextFunction } from 'express';
import { HttpException, ValidationException } from '../exceptions';
import { ErrorResponse, sendResponse, ValidationErrorResponse } from '../responses';
import { StatusCode } from '../enums';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (error: Error, req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof ValidationException) {
    sendResponse(res, new ValidationErrorResponse(error.message, error.errors));
    return;
  }

  if (error instanceof HttpException) {
    sendResponse(res, new ErrorResponse(error.message, error.statusCode));
    return;
  }

  console.error(error);
  sendResponse(res, new ErrorResponse('Server error.', StatusCode.SERVER_ERROR));
};
