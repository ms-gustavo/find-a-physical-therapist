import Therapist from "../models/Therapist";
import { serverMessagesResponses } from "./serverMessagesResponses";
import Client from "../models/Client";

export const therapistExists = async (therapistId: string) => {
  const therapist = await Therapist.findById(therapistId);
  if (!therapist) {
    throw new Error(serverMessagesResponses.therapistNotFound);
  }
  return therapist;
};

export const clientExists = async (clientId: string) => {
  const client = await Client.findById(clientId);
  if (!client) {
    throw new Error(serverMessagesResponses.userNotFound);
  }
  return client;
};
