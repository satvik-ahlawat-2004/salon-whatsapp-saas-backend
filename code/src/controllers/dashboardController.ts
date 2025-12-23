import { Request, Response, NextFunction } from "express";
import { getDashboardMetrics } from "../services/dashboardService";

export const metricsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const metrics = await getDashboardMetrics(req.salonId!);
    res.json(metrics);
  } catch (error) {
    next(error);
  }
};

