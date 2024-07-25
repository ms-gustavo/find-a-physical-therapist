import express from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { validateCreateReviewFields } from "../middlewares/validadeReviewFieldsMiddleware";
import {
  createAReview,
  getIndividualReview,
} from "../controllers/reviewController";

const router = express.Router();

router.post("/create", authenticate, validateCreateReviewFields, createAReview);
router.get("/:therapistId", getIndividualReview);

export default router;
