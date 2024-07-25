import { Response } from "express";
import { AuthenticatedRequest } from "../interfaces/interface";
import { serverMessagesResponses } from "../utils/serverMessagesResponses";
import Consultation from "../models/Consultation";

export const createAConsult = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: serverMessagesResponses.unauthenticatedUser });
  }

  const { therapistId, date, time } = req.body;

  //VALIDATOR
  if (!therapistId || !date || !time) {
    return res
      .status(400)
      .json({ message: `Therapist ID, date and time are required` });
  }

  //COMPONENTATION
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
