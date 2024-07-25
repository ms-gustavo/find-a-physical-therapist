import express from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { createAConsult } from "../controllers/consultController";

const router = express.Router();

router.post("/create", authenticate, createAConsult);

export default router;
