import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { serverMessagesResponses } from "../utils/serverMessagesResponses";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: serverMessagesResponses.noTokenProvided });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET! as string) as {
      _id: string;
    };
    req.user = { _id: decoded._id };
    next();
  } catch (error) {
    res.status(401).json({ message: serverMessagesResponses.invalidToken });
  }
};
