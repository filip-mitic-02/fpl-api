import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validate = (schema: ZodType) => {
    return (req: Request, res:Response, next:NextFunction): void => {
        const result = schema.safeParse(req.body);
        if(!result.success){
            res.status(400).json({
                success: false,
                errors: result.error.issues.map(issue => ({
                    field: issue.path[0],
                    message: issue.message
                }))
            });
            return;
        }

        req.body = result.data;
        next();
    };
};