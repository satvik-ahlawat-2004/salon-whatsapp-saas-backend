import { NextFunction, Request, Response } from "express";
import { HttpError } from "./errorHandler";

export const requireTenant = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new HttpError(401, "Unauthenticated"));
  }

  if (!req.user.salonId) {
    return next(new HttpError(400, "Missing salon context"));
  }

  req.salonId = req.user.salonId;
  next();
};

