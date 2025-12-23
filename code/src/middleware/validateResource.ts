import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validateResource =
  (schema: ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
    const parsed = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!parsed.success) {
      return next(parsed.error);
    }

    next();
  };

