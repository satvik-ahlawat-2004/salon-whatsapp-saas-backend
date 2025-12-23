import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { HttpError } from "../middleware/errorHandler";

export type JwtPayload = {
  userId: string;
  salonId: string;
  role: string;
};

const TOKEN_EXPIRY = "8h";

export const signToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: TOKEN_EXPIRY });
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, env.jwtSecret) as JwtPayload;
  } catch (err) {
    throw new HttpError(401, "Invalid or expired token");
  }
};

