import { Request, Response } from "express";
import { AuthenticatedRequest } from "../interfaces/interface";
import Review from "../models/Review";
import { therapistExists } from "../utils/findClientOrTherapist";
import { serverMessagesResponses } from "../utils/serverMessagesResponses";

export const createAReview = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { therapistId, rating, comment } = req.body;

  try {
    const therapistExist = await therapistExists(therapistId);
    if (
      (therapistExist as { success: boolean; message: string }).success ===
      false
    ) {
      return res
        .status(404)
        .json(
          (therapistExist as { success: boolean; message: string }).message
        );
    }

    const newReview = new Review({
      clientId: req.user!._id,
      therapistId,
      rating,
      comment,
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: serverMessagesResponses.internalServerError });
    console.error(error.message);
  }
};

export const getIndividualReview = async (req: Request, res: Response) => {
  const { therapistId } = req.params;

  try {
    const reviews = await Review.find({ therapistId }).populate(
      "clientId",
      "name"
    );

    if (reviews.length === 0) {
      return res
        .status(204)
        .json({ message: serverMessagesResponses.noReviewsFound });
    }
    res.status(200).json({ reviews });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: serverMessagesResponses.internalServerError });
    console.error(error.message);
  }
};
