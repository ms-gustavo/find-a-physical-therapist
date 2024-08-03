import { Request, Response } from "express";
import { AuthenticatedRequest } from "../interfaces/interface";
import Review from "../models/Review";
import { clientExists, therapistExists } from "../utils/findClientOrTherapist";

export const createAReview = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { therapistId, rating, comment } = req.body;

  try {
    await therapistExists(therapistId);
    const clientId = req.user!._id;
    await clientExists(clientId);

    const newReview = new Review({
      clientId: req.user!._id,
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

export const getIndividualReview = async (req: Request, res: Response) => {
  const { therapistId } = req.params;

  try {
    const reviews = await Review.find({ therapistId }).populate(
      "clientId",
      "name"
    );
    res.status(200).json({ reviews });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
