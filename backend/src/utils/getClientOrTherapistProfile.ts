import { getUserProfileProps } from "../interfaces/interface";
import Client, { IClient } from "../models/Client";
import Therapist, { ITherapist } from "../models/Therapist";

export async function getClientOrTherapistProfile({
  type,
  userId,
  updateFields,
}: getUserProfileProps): Promise<IClient | ITherapist | null> {
  const options = { new: true, runValidators: true };
  let updatedUser;
  if (type === "client") {
    updatedUser = await Client.findByIdAndUpdate(
      userId,
      { ...updateFields },
      options
    ).select("-password");
  }

  if (type === "therapist") {
    updatedUser = await Therapist.findByIdAndUpdate(
      userId,
      {
        ...updateFields,
      },
      options
    ).select("-password");
  }
  if (!updatedUser) {
    return null;
  }
  return updatedUser;
}
