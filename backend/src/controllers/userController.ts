import { Response } from "express";
import { serverMessagesResponses } from "../utils/serverMessagesResponses";
import { AuthenticatedRequest } from "../interfaces/interface";
import { getUserModel } from "../utils/getUserModel";
import { getClientOrTherapistProfile } from "../utils/getClientOrTherapistProfile";
import Client from "../models/Client";
import Therapist from "../models/Therapist";

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
    res
      .status(500)
      .json({ message: serverMessagesResponses.internalServerError });
    console.error(error.message);
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
    res
      .status(500)
      .json({ message: serverMessagesResponses.internalServerError });
    console.error(error.message);
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
    res
      .status(500)
      .json({ message: serverMessagesResponses.internalServerError });
    console.error(error.message);
  }
};

export const deleteUserProfile = async (
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

    if (userResult.type === "Client") {
      await Client.findByIdAndDelete(userId);
    } else {
      await Therapist.findByIdAndDelete(userId);
    }

    res.status(200).json({ message: serverMessagesResponses.userDeleted });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: serverMessagesResponses.internalServerError });
    console.error(error.message);
  }
};
