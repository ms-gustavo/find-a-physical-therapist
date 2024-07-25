import express from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { validateCreateReviewFields } from "../middlewares/validadeReviewFieldsMiddleware";
import { createAReview } from "../controllers/reviewController";

const router = express.Router();

router.post("/create", authenticate, validateCreateReviewFields, createAReview);

export default router;
