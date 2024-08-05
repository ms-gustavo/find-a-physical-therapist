import { NextFunction, Request, Response } from "express";
import { getConsultByDateSchema } from "../utils/validationsSchema";

export const validadeGetConsultsByDateFieldsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = getConsultByDateSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: error.details.map((detail) => detail.message).join(", "),
    });
  }

  next();
};
