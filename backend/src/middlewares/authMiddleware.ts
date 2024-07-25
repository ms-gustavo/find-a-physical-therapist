import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { serverMessagesResponses } from "../utils/serverMessagesResponses";
import { AuthenticatedRequest } from "../interfaces/interface";

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error(serverMessagesResponses.noTokenProvided);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET! as string) as {
      id: string;
    };

    req.user = { _id: decoded.id };
    next();
  } catch (error: any) {
    res.status(401).json({
      message:
        error.message === serverMessagesResponses.noTokenProvided
          ? error.message
          : serverMessagesResponses.invalidToken,
    });
  }
};
