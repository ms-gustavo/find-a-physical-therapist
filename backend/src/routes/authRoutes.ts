import { Router } from "express";
import { login, registerNewUser } from "../controllers/authController";
import {
  validateLoginUserFields,
  validateRegisterUserFields,
} from "../middlewares/validateUserFields";

const router = Router();

router.post("/register", validateRegisterUserFields, registerNewUser);
router.post("/login", validateLoginUserFields, login);

export default router;
