import { NextFunction, Request, Response } from "express";
import { consultSchema } from "../utils/validationsSchema";

export const validateCreateConsultsFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = consultSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: error.details.map((detail) => detail.message).join(", "),
    });
  }

  next();
};
