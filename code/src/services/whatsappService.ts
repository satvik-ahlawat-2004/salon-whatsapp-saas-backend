import axios from "axios";
import { MessageDirection, MessageStatus } from "@prisma/client";
import { prisma } from "../config/prisma";
import { HttpError } from "../middleware/errorHandler";
import { env } from "../config/env";
import { logger } from "../utils/logger";

type WebhookPayload = {
  salonId: string;
  from: string;
  to: string;
  message?: string;
  waMessageId?: string;
  status?: MessageStatus;
  payload?: unknown;
};

export const handleInboundMessage = async (payload: WebhookPayload) => {
  return prisma.whatsAppMessage.create({
    data: {
      salonId: payload.salonId,
      appointmentId: null,
      direction: MessageDirection.INBOUND,
      status: payload.status ?? MessageStatus.RECEIVED,
      fromNumber: payload.from,
      toNumber: payload.to,
      body: payload.message ?? null,
      waMessageId: payload.waMessageId ?? null,
      payload: payload.payload as any,
    },
  });
};

type NotificationInput = {
  appointmentId: string;
  message: string;
  toNumber?: string;
  salonId?: string;
};

export const sendAppointmentNotification = async (input: NotificationInput) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id: input.appointmentId },
    include: { customer: true, salon: true },
  });

  if (!appointment) {
    throw new HttpError(404, "Appointment not found");
  }

  if (input.salonId && appointment.salonId !== input.salonId) {
    throw new HttpError(403, "Appointment does not belong to this salon");
  }

  const targetNumber = input.toNumber ?? appointment.customer.phone;

  // Placeholder outbound call. Replace with actual WhatsApp API request.
  logger.info("Sending WhatsApp notification", {
    to: targetNumber,
    appointmentId: appointment.id,
  });

  if (env.whatsappApiToken) {
    try {
      await axios.post(
        "https://graph.facebook.com/v19.0/messages",
        {
          messaging_product: "whatsapp",
          to: targetNumber,
          type: "text",
          text: { body: input.message },
        },
        {
          headers: {
            Authorization: `Bearer ${env.whatsappApiToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      logger.error("WhatsApp send failed", { error });
    }
  }

  return prisma.whatsAppMessage.create({
    data: {
      salonId: appointment.salonId,
      appointmentId: appointment.id,
      direction: MessageDirection.OUTBOUND,
      status: MessageStatus.SENT,
      fromNumber: env.whatsappBusinessNumber || "whatsapp-business",
      toNumber: targetNumber,
      body: input.message,
    },
  });
};

