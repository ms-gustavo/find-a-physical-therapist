import express from "express";
import { updateUser } from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.put("/profile", authenticate, updateUser);

export default router;
