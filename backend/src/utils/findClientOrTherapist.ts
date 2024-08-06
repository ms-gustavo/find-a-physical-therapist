import Therapist from "../models/Therapist";
import { serverMessagesResponses } from "./serverMessagesResponses";

export const therapistExists = async (therapistId: string) => {
  const therapist = await Therapist.findById(therapistId);
  if (!therapist) {
    return {
      success: false,
      message: serverMessagesResponses.therapistNotFound,
    };
  }
  return therapist;
};
