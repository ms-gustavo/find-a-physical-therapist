import express from "express";
import {
  searchTherapists,
  getAllTherapists,
  searchTherapistByName,
} from "../controllers/searchController";

const router = express.Router();

router.get("/therapistbyname", searchTherapistByName);
router.get("/alltherapists", getAllTherapists);
router.get("/therapists", searchTherapists);

export default router;
