import express from "express";
import {
  updateClient,
  getUserProfile,
  updateTherapist,
} from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.put("/client/profile", authenticate, updateClient);
router.put("/therapist/profile", authenticate, updateTherapist);
router.get("/profile", authenticate, getUserProfile);

export default router;
