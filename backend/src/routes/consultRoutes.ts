import express from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { createAConsult } from "../controllers/consultController";
import { validateCreateConsultsFields } from "../middlewares/validateConsultFieldsMiddleware";

const router = express.Router();

router.post(
  "/create",
  authenticate,
  validateCreateConsultsFields,
  createAConsult
);

export default router;
