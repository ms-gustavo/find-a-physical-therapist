import { Response } from "express";
import { AuthenticatedRequest } from "../interfaces/interface";
import Consultation from "../models/Consultation";
import { formatDate } from "../utils/formatDate";
import { therapistExists } from "../utils/findClientOrTherapist";
import { serverMessagesResponses } from "../utils/serverMessagesResponses";

export const createAConsult = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { therapistId, datetime } = req.body;

  await therapistExists(therapistId);
  const { date, time } = formatDate(datetime);

  const existingConsultation = await Consultation.findOne({
    therapistId,
    date,
    time,
  });

  if (existingConsultation) {
    return res
      .status(409)
      .json({ message: serverMessagesResponses.consultAlreadyExists });
  }

  try {
    const newConsultation = new Consultation({
      clientId: req.user!._id,
      therapistId,
      date,
      time,
    });
    const savedConsultation = await newConsultation.save();
    res.status(201).json({ savedConsultation });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getConsultationsByDate = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { therapistId, date } = req.query;

  try {
    if (!therapistId || !date) {
      return res
        .status(400)
        .json({ message: serverMessagesResponses.wrongTherapistIdOrDate });
    }

    const consultations = await Consultation.find({
      therapistId,
      date,
    });

    res.status(200).json({ consultations });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getConsultHistory = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const consultations = await Consultation.find({
      clientId: req.user!._id,
    }).populate("therapistId", "name");
    res.status(200).json({ consultations });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
