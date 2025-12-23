import { AppointmentStatus } from "@prisma/client";
import { prisma } from "../config/prisma";
import { HttpError } from "../middleware/errorHandler";

type SalonScoped = { salonId: string };

export const createCustomer = async (salonId: string, data: { name: string; phone: string; email?: string; notes?: string }) => {
  return prisma.customer.create({
    data: {
      salonId,
      name: data.name,
      phone: data.phone,
      email: data.email ?? null,
      notes: data.notes ?? null,
    },
  });
};

export const listCustomers = async (salonId: string) => {
  return prisma.customer.findMany({
    where: { salonId },
    orderBy: { createdAt: "desc" },
  });
};

export const createStaff = async (salonId: string, data: { name: string; phone?: string; title?: string }) => {
  return prisma.staff.create({
    data: {
      salonId,
      name: data.name,
      phone: data.phone ?? null,
      title: data.title ?? null,
    },
  });
};

export const listStaff = async (salonId: string) => {
  return prisma.staff.findMany({
    where: { salonId },
    orderBy: { name: "asc" },
  });
};

export const createService = async (salonId: string, data: { name: string; description?: string; durationMinutes: number; price: number }) => {
  return prisma.service.create({
    data: {
      salonId,
      name: data.name,
      description: data.description ?? null,
      durationMinutes: data.durationMinutes,
      price: data.price,
    },
  });
};

export const listServices = async (salonId: string) => {
  return prisma.service.findMany({
    where: { salonId },
    orderBy: { name: "asc" },
  });
};

type CreateAppointmentInput = SalonScoped & {
  customerId: string;
  staffId: string;
  serviceId: string;
  startTime: Date;
  endTime?: Date;
  notes?: string;
  status?: AppointmentStatus;
  createdById?: string;
};

export const createAppointment = async (input: CreateAppointmentInput) => {
  const [customer, staff, service] = await Promise.all([
    prisma.customer.findFirst({ where: { id: input.customerId, salonId: input.salonId } }),
    prisma.staff.findFirst({ where: { id: input.staffId, salonId: input.salonId } }),
    prisma.service.findFirst({ where: { id: input.serviceId, salonId: input.salonId } }),
  ]);

  if (!customer || !staff || !service) {
    throw new HttpError(400, "Invalid customer, staff, or service");
  }

  const start = input.startTime;
  const end = input.endTime ?? new Date(start.getTime() + service.durationMinutes * 60000);

  const conflicting = await prisma.appointment.findFirst({
    where: {
      salonId: input.salonId,
      staffId: staff.id,
      status: { notIn: [AppointmentStatus.CANCELLED] },
      AND: [{ startTime: { lt: end } }, { endTime: { gt: start } }],
    },
  });

  if (conflicting) {
    throw new HttpError(409, "Staff already has an appointment in this slot");
  }

  const appointment = await prisma.$transaction(async (tx) => {
    const created = await tx.appointment.create({
      data: {
        salonId: input.salonId,
        customerId: customer.id,
        staffId: staff.id,
        serviceId: service.id,
        startTime: start,
        endTime: end,
        status: input.status ?? AppointmentStatus.PENDING,
        notes: input.notes ?? null,
      },
      include: {
        customer: true,
        staff: true,
        service: true,
      },
    });

    await tx.appointmentStatusHistory.create({
      data: {
        appointmentId: created.id,
        status: created.status,
        note: "Created",
        changedById: input.createdById ?? null,
      },
    });

    return created;
  });

  return appointment;
};

export const listAppointments = async (salonId: string, start?: Date, end?: Date) => {
  return prisma.appointment.findMany({
    where: {
      salonId,
      ...(start && end
        ? {
            startTime: { gte: start },
            endTime: { lte: end },
          }
        : {}),
    },
    orderBy: { startTime: "asc" },
    include: {
      customer: true,
      staff: true,
      service: true,
    },
  });
};

export const updateAppointmentStatus = async (
  salonId: string,
  appointmentId: string,
  status: AppointmentStatus,
  changedById?: string,
  note?: string
) => {
  const appointment = await prisma.appointment.findFirst({
    where: { id: appointmentId, salonId },
  });

  if (!appointment) {
    throw new HttpError(404, "Appointment not found");
  }

  const updated = await prisma.$transaction(async (tx) => {
    const updatedAppt = await tx.appointment.update({
      where: { id: appointmentId },
      data: {
        status,
      },
      include: {
        customer: true,
        staff: true,
        service: true,
      },
    });

    await tx.appointmentStatusHistory.create({
      data: {
        appointmentId,
        status,
        note: note ?? null,
        changedById: changedById ?? null,
      },
    });

    return updatedAppt;
  });

  return updated;
};

