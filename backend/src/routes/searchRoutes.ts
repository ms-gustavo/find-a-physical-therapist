import express from "express";
import {
  searchTherapistsByQuery,
  getAllTherapists,
  searchTherapistByName,
} from "../controllers/searchController";

const router = express.Router();

router.get("/therapistbyname", searchTherapistByName);
router.get("/getalltherapists", getAllTherapists);
router.get("/therapists", searchTherapistsByQuery);

export default router;
