import { Router } from "express";
import authRoutes from "./authRoutes";
import appointmentRoutes from "./appointmentRoutes";
import whatsappRoutes from "./whatsappRoutes";
import dashboardRoutes from "./dashboardRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/whatsapp", whatsappRoutes);
router.use("/dashboard", dashboardRoutes);

router.get("/ping", (_req, res) => {
  res.json({ message: "pong" });
});

export default router;

