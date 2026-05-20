import { Request, Response, NextFunction } from 'express';
import { HttpException, ValidationException } from '../exceptions';
import { sendResponse } from '../responses';
import { StatusCode } from '../enums';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ValidationException) {
    return sendResponse(res, error.statusCode, error.message, undefined, error.errors);
  }

  if (error instanceof HttpException) {
    return sendResponse(res, error.statusCode, error.message);
  }

  return sendResponse(res, StatusCode.SERVER_ERROR, 'Server error.');
};
