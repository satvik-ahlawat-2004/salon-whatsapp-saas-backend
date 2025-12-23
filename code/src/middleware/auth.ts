import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { HttpError } from "./errorHandler";

export const requireAuth =
  (roles?: string[]) => (req: Request, _res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return next(new HttpError(401, "Missing authorization header"));
    }

    const token = header.replace("Bearer ", "").trim();
    const payload = verifyToken(token);

    if (roles && !roles.includes(payload.role)) {
      return next(new HttpError(403, "Insufficient permissions"));
    }

    req.user = payload;
    next();
  };

