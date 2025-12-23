import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { handleInboundMessage, sendAppointmentNotification } from "../services/whatsappService";
import { validateResource } from "../middleware/validateResource";
import { MessageStatus } from "@prisma/client";

const webhookSchema = z.object({
  body: z.object({
    salonId: z.string().uuid(),
    from: z.string(),
    to: z.string(),
    message: z.string().optional(),
    waMessageId: z.string().optional(),
    status: z.nativeEnum(MessageStatus).optional(),
    payload: z.any().optional(),
  }),
});

const notificationSchema = z.object({
  body: z.object({
    appointmentId: z.string().uuid(),
    message: z.string().min(1),
    toNumber: z.string().optional(),
  }),
});

export const whatsappWebhookHandler = [
  validateResource(webhookSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const saved = await handleInboundMessage(req.body);
      res.status(201).json(saved);
    } catch (error) {
      next(error);
    }
  },
];

export const sendNotificationHandler = [
  validateResource(notificationSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sent = await sendAppointmentNotification({
        ...req.body,
        salonId: req.salonId,
      });
      res.status(201).json(sent);
    } catch (error) {
      next(error);
    }
  },
];

