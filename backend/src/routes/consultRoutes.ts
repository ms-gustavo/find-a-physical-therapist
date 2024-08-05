import express from "express";
import { authenticate } from "../middlewares/authMiddleware";
import {
  createAConsult,
  getConsultationsByDate,
  getConsultHistory,
} from "../controllers/consultController";
import { validateCreateConsultsFields } from "../middlewares/validateConsultFieldsMiddleware";
import { validadeGetConsultsByDateFieldsMiddleware } from "../middlewares/validateGetConsultsByDateFieldsMiddleware";

const router = express.Router();

router.post(
  "/create",
  authenticate,
  validateCreateConsultsFields,
  createAConsult
);
router.get("/history", authenticate, getConsultHistory);
router.get("/consultations", authenticate, getConsultationsByDate);

export default router;
