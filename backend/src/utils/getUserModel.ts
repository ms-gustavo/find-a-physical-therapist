import Client from "../models/Client";
import Therapist from "../models/Therapist";

export async function getUserModel(userId: string) {
  const client = await Client.findById(userId);
  if (client) return { user: client, type: "Client" };

  const therapist = await Therapist.findById(userId);
  if (therapist) return { user: therapist, type: "Therapist" };

  return null;
}
