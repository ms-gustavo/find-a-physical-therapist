import { Response } from "express";
import { AuthenticatedRequest } from "../interfaces/interface";
import { serverMessagesResponses } from "../utils/serverMessagesResponses";
import Review from "../models/Review";

export const createAReview = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  if (!req.user) {
    return res.status(401).json({
      message: serverMessagesResponses.unauthenticatedUser,
    });
  }

  const { therapistId, rating, comment } = req.body;

  try {
    const newReview = new Review({
      clientId: req.user._id,
      therapistId,
      rating,
      comment,
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
