import { Router } from "express";
import { loginHandler, registerOwnerHandler } from "../controllers/authController";

const router = Router();

router.post("/register-owner", registerOwnerHandler);
router.post("/login", loginHandler);

export default router;

