import { Router } from "express";
import {
  createAppointmentHandler,
  createCustomerHandler,
  createServiceHandler,
  createStaffHandler,
  listAppointmentsHandler,
  listCustomersHandler,
  listServicesHandler,
  listStaffHandler,
  updateStatusHandler,
} from "../controllers/appointmentController";
import { requireAuth } from "../middleware/auth";
import { requireTenant } from "../middleware/tenant";

const router = Router();

router.use(requireAuth(), requireTenant);

router.post("/customers", createCustomerHandler);
router.get("/customers", listCustomersHandler);

router.post("/staff", createStaffHandler);
router.get("/staff", listStaffHandler);

router.post("/services", createServiceHandler);
router.get("/services", listServicesHandler);

router.post("/", createAppointmentHandler);
router.get("/", listAppointmentsHandler);
router.patch("/:id/status", updateStatusHandler);

export default router;

