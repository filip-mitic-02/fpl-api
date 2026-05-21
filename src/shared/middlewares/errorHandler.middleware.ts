import { Request, Response, NextFunction } from 'express';
import { BadRequestException, HttpException } from '../exceptions';
import { sendResponse } from '../responses';
import { StatusCode } from '../enums';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error instanceof HttpException ? error.statusCode : StatusCode.SERVER_ERROR;
  const message = error instanceof HttpException ? error.message : 'Server error.';
  const errors = error instanceof BadRequestException ? error.errors : undefined;

  return sendResponse(res, statusCode, message, undefined, errors);
};
