import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  createAppointment,
  createCustomer,
  createService,
  createStaff,
  listAppointments,
  listCustomers,
  listServices,
  listStaff,
  updateAppointmentStatus,
} from "../services/appointmentService";
import { validateResource } from "../middleware/validateResource";
import { AppointmentStatus } from "@prisma/client";

const customerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    phone: z.string().min(6),
    email: z.string().email().optional(),
    notes: z.string().optional(),
  }),
});

const staffSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    phone: z.string().optional(),
    title: z.string().optional(),
  }),
});

const serviceSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    description: z.string().optional(),
    durationMinutes: z.number().int().positive(),
    price: z.number().nonnegative(),
  }),
});

const appointmentSchema = z.object({
  body: z.object({
    customerId: z.string().uuid(),
    staffId: z.string().uuid(),
    serviceId: z.string().uuid(),
    startTime: z.string().datetime(),
    endTime: z.string().datetime().optional(),
    notes: z.string().optional(),
    status: z.nativeEnum(AppointmentStatus).optional(),
  }),
});

const statusSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    status: z.nativeEnum(AppointmentStatus),
    note: z.string().optional(),
  }),
});

const rangeSchema = z.object({
  query: z.object({
    start: z.string().datetime().optional(),
    end: z.string().datetime().optional(),
  }),
});

export const createCustomerHandler = [
  validateResource(customerSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customer = await createCustomer(req.salonId!, req.body);
      res.status(201).json(customer);
    } catch (error) {
      next(error);
    }
  },
];

export const listCustomersHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customers = await listCustomers(req.salonId!);
    res.json(customers);
  } catch (error) {
    next(error);
  }
};

export const createStaffHandler = [
  validateResource(staffSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const staff = await createStaff(req.salonId!, req.body);
      res.status(201).json(staff);
    } catch (error) {
      next(error);
    }
  },
];

export const listStaffHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const staff = await listStaff(req.salonId!);
    res.json(staff);
  } catch (error) {
    next(error);
  }
};

export const createServiceHandler = [
  validateResource(serviceSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await createService(req.salonId!, {
        ...req.body,
        price: Number(req.body.price),
      });
      res.status(201).json(service);
    } catch (error) {
      next(error);
    }
  },
];

export const listServicesHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const services = await listServices(req.salonId!);
    res.json(services);
  } catch (error) {
    next(error);
  }
};

export const createAppointmentHandler = [
  validateResource(appointmentSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const appointmentInput = {
        salonId: req.salonId!,
        customerId: req.body.customerId,
        staffId: req.body.staffId,
        serviceId: req.body.serviceId,
        startTime: new Date(req.body.startTime),
      } as {
        salonId: string;
        customerId: string;
        staffId: string;
        serviceId: string;
        startTime: Date;
        endTime?: Date;
        notes?: string;
        status?: AppointmentStatus;
        createdById?: string;
      };

      if (req.body.endTime) {
        appointmentInput.endTime = new Date(req.body.endTime);
      }
      if (req.body.notes) {
        appointmentInput.notes = req.body.notes;
      }
      if (req.body.status) {
        appointmentInput.status = req.body.status;
      }
      if (req.user?.userId) {
        appointmentInput.createdById = req.user.userId;
      }

      const appointment = await createAppointment(appointmentInput);
      res.status(201).json(appointment);
    } catch (error) {
      next(error);
    }
  },
];

export const listAppointmentsHandler = [
  validateResource(rangeSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const start = req.query.start ? new Date(String(req.query.start)) : undefined;
      const end = req.query.end ? new Date(String(req.query.end)) : undefined;
      const appointments = await listAppointments(req.salonId!, start, end);
      res.json(appointments);
    } catch (error) {
      next(error);
    }
  },
];

export const updateStatusHandler = [
  validateResource(statusSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updated = await updateAppointmentStatus(
        req.salonId!,
        req.params.id!,
        req.body.status,
        req.user?.userId,
        req.body.note
      );
      res.json(updated);
    } catch (error) {
      next(error);
    }
  },
];

