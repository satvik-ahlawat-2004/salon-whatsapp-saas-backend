import { Router } from "express";
import { sendNotificationHandler, whatsappWebhookHandler } from "../controllers/whatsappController";
import { requireAuth } from "../middleware/auth";
import { requireTenant } from "../middleware/tenant";

const router = Router();

// Public webhook for inbound messages
router.post("/webhook", whatsappWebhookHandler);

// Protected outbound notification
router.post("/notifications", requireAuth(), requireTenant, sendNotificationHandler);

export default router;

