import { Response } from "express";
import { serverMessagesResponses } from "../utils/serverMessagesResponses";
import { AuthenticatedRequest } from "../interfaces/interface";
import { getUserModel } from "../utils/getUserModel";
import { getClientOrTherapistProfile } from "../utils/getClientOrTherapistProfile";

export const updateClient = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.user!._id;
  const { name, location } = req.body;

  try {
    const updatedUser = await getClientOrTherapistProfile({
      type: "client",
      userId: userId,
      updateFields: { name, location },
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: serverMessagesResponses.userNotFound });
    }
    res.status(200).json({ updatedUser });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTherapist = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.user!._id;
  const { name, speciality, mediumCost, location, phoneNumber } = req.body;

  try {
    const updatedUser = await getClientOrTherapistProfile({
      type: "therapist",
      userId: userId,
      updateFields: { name, speciality, mediumCost, location, phoneNumber },
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: serverMessagesResponses.userNotFound });
    }
    res.status(200).json({ updatedUser });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.user!._id;
  try {
    const userResult = await getUserModel(userId);

    if (!userResult) {
      return res
        .status(404)
        .json({ message: serverMessagesResponses.userNotFound });
    }

    res.status(200).json(userResult);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
