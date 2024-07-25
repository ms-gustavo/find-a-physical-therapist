import { NextFunction, Request, Response } from "express";
import { reviewSchema } from "../utils/validationsSchema";

export const validateCreateReviewFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = reviewSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: error.details.map((detail) => detail.message).join(", "),
    });
  }

  next();
};
