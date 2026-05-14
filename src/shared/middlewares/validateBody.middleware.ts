import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { ValidationErrorResponse } from "../responses";

export const validateBody = (schema: ZodType) => {
    return (req: Request, res:Response, next:NextFunction): void => {
        const result = schema.safeParse(req.body);
        if(!result.success){
            res.status(400).json(new ValidationErrorResponse('Validation failed.', 
                result.error.issues.map(issue => ({
                    field: String(issue.path[0]),
                    message: issue.message
                }))
            ));
            return;
        }

        req.body = result.data;
        next();
    };
};