import { Request, Response, NextFunction } from 'express';
import { ErrorResponse, SuccessResponse, ValidationErrorResponse } from '../responses';

export const responseHandler = (req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res.send = function (body: any): any {
    if (body instanceof SuccessResponse || body instanceof ErrorResponse) {
      res.send = originalSend;
      res.status(body.statusCode).json({
        success: body.success,
        ...(body instanceof SuccessResponse ? { data: body.data } : { message: body.message }),
        ...(body instanceof ValidationErrorResponse ? { errors: body.errors } : {}),
      });
    } else {
      originalSend.call(this, body);
    }
  };
  next();
};
