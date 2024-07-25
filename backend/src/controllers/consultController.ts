import { Response } from "express";
import { AuthenticatedRequest } from "../interfaces/interface";
import { serverMessagesResponses } from "../utils/serverMessagesResponses";
import Consultation from "../models/Consultation";
import { formatDate } from "../utils/formatDate";

export const createAConsult = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: serverMessagesResponses.unauthenticatedUser });
  }
  const { therapistId, datetime } = req.body;
  const { date, time } = formatDate(datetime);
  try {
    const newConsultation = new Consultation({
      clientId: req.user._id,
      therapistId,
      date,
      time,
    });
    const savedConsultation = await newConsultation.save();
    res.status(201).json(savedConsultation);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
