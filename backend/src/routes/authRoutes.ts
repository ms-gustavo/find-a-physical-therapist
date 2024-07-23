import { Router } from "express";
import { registerNewUser } from "../controllers/authController";

const router = Router();

router.post("/register", registerNewUser);

export default router;
