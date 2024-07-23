import { Request, Response } from "express";
import User from "../models/User";
import { serverMessagesResponses } from "../utils/serverMessagesResponses";
import { AuthenticatedRequest } from "../interfaces/interface";

export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: serverMessagesResponses.unauthenticatedUser });
  }
  const userId = req.user._id;
  const { name, speciality, location } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
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
