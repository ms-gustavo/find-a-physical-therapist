import { Request, Response } from "express";
import Client from "../models/Client";
import { serverMessagesResponses } from "../utils/serverMessagesResponses";
import { AuthenticatedRequest } from "../interfaces/interface";
import { getUserModel } from "../utils/getUserModel";

export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: serverMessagesResponses.unauthenticatedUser });
  }
  const userId = req.user._id;
  const { name, speciality, location } = req.body;

  try {
    const updatedUser = await Client.findByIdAndUpdate(
      userId,
      { name, speciality, location },
      { new: true, runValidators: true }
    ).select("-password");

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
  if (!req.user) {
    return res
      .status(401)
      .json({ message: serverMessagesResponses.unauthenticatedUser });
  }
  const userId = req.user._id;
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
