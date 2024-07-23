import { NextFunction, Request, Response } from "express";
import {
  loginUserSchema,
  registerUserSchema,
} from "../utils/validationsSchema";

export const validateRegisterUserFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = registerUserSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: error.details.map((detail) => detail.message).join(", "),
    });
  }

  next();
};

export const validateLoginUserFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = loginUserSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details.map((detail) => detail.message).join(", "),
    });
  }

  next();
};
