import express from "express";
import { authenticate } from "../middlewares/authMiddleware";
import {
  createAConsult,
  getConsultHistory,
} from "../controllers/consultController";
import { validateCreateConsultsFields } from "../middlewares/validateConsultFieldsMiddleware";

const router = express.Router();

router.post(
  "/create",
  authenticate,
  validateCreateConsultsFields,
  createAConsult
);
router.get("/history", authenticate, getConsultHistory);

export default router;
