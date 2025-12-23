import { Router } from "express";
import { metricsHandler } from "../controllers/dashboardController";
import { requireAuth } from "../middleware/auth";
import { requireTenant } from "../middleware/tenant";

const router = Router();

router.use(requireAuth(), requireTenant);
router.get("/metrics", metricsHandler);

export default router;

