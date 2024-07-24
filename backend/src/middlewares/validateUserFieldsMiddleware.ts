import { NextFunction, Request, Response } from "express";
import {
  loginSchema,
  registerClientSchema,
  registerTherapistSchema,
} from "../utils/validationsSchema";

export const validateRegisterClientFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = registerClientSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: error.details.map((detail) => detail.message).join(", "),
    });
  }

  next();
};

export const validateRegisterTherapistFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = registerTherapistSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: error.details.map((detail) => detail.message).join(", "),
    });
  }

  next();
};

export const validateLoginFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details.map((detail) => detail.message).join(", "),
    });
  }

  next();
};
