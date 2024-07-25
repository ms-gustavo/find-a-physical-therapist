import { Request, Response } from "express";
import { AuthenticatedRequest } from "../interfaces/interface";
import { serverMessagesResponses } from "../utils/serverMessagesResponses";
import Review from "../models/Review";
import Client from "../models/Client";

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
    const clientId = req.user._id;
    console.log("ClientID", clientId);

    const clientExists = await Client.findById(clientId);
    if (!clientExists) {
      return res
        .status(404)
        .json({ message: serverMessagesResponses.userNotFound });
    }

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

export const getIndividualReview = async (req: Request, res: Response) => {
  const { therapistId } = req.params;

  try {
    const reviews = await Review.find({ therapistId }).populate(
      "clientId",
      "name"
    );
    console.log(reviews);
    res.status(200).json(reviews);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
