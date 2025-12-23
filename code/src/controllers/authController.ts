import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { login, registerOwner } from "../services/authService";
import { validateResource } from "../middleware/validateResource";

const registerSchema = z.object({
  body: z.object({
    salonName: z.string().min(2),
    salonPhone: z.string().optional(),
    salonCity: z.string().optional(),
    ownerName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    phone: z.string().optional(),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

export const registerOwnerHandler = [
  validateResource(registerSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await registerOwner(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
];

export const loginHandler = [
  validateResource(loginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await login(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
];

