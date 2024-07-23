import express from "express";
import { updateUser, getUserProfile } from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.put("/profile", authenticate, updateUser);
router.get("/profile", authenticate, getUserProfile);

export default router;
