import { Request, Response, NextFunction } from 'express';
import { BadRequestException, HttpException } from '../exceptions';
import { sendResponse } from '../responses';
import { StatusCode } from '../enums';
import { logger } from '../utils';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error instanceof HttpException ? error.statusCode : StatusCode.SERVER_ERROR;
  const message = error instanceof HttpException ? error.message : 'Server error.';
  const errors = error instanceof BadRequestException ? error.errors : undefined;

  if (error instanceof HttpException) {
    logger.warn(error.message, {
      name: error.name,
      statusCode: error.statusCode,
      trace: error.stack,
      method: req.method,
      url: req.url,
      ip: req.ip,
    });
  } else {
    logger.error('Unexpected error occured.', { message: error.message, trace: error.stack, method: req.method, url: req.url, ip: req.ip });
  }

  return sendResponse(res, statusCode, message, undefined, errors);
};
