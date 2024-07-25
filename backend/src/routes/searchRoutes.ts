import express from "express";
import {
  searchTherapistsByQuery,
  getAllTherapists,
  searchTherapistByName,
  getTherapistById,
} from "../controllers/searchController";

const router = express.Router();

router.get("/therapistbyname", searchTherapistByName);
router.get("/getalltherapists", getAllTherapists);
router.get("/therapists", searchTherapistsByQuery);
router.get("/therapist/:therapistId", getTherapistById);

export default router;
