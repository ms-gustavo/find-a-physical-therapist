import { Router } from "express";
import {
  loginClient,
  loginTherapist,
  registerNewClient,
  registerNewTherapist,
} from "../controllers/authController";
import {
  validateLoginFields,
  validateRegisterClientFields,
  validateRegisterTherapistFields,
} from "../middlewares/validateUserFieldsMiddleware";

const router = Router();

router.post(
  "/client/register",
  validateRegisterClientFields,
  registerNewClient
);
router.post("/client/login", validateLoginFields, loginClient);
router.post(
  "/therapist/register",
  validateRegisterTherapistFields,
  registerNewTherapist
);
router.post("/therapist/login", validateLoginFields, loginTherapist);

export default router;
