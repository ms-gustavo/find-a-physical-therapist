import Client, { IClient } from "../models/Client";
import Therapist, { ITherapist } from "../models/Therapist";

export async function getUserModel(userId: string) {
  const client = await Client.findById(userId);
  if (client) {
    const clientWithoutPassword: Partial<IClient> = client.toObject();
    delete clientWithoutPassword.password;
    return { user: clientWithoutPassword, type: "Client" };
  }

  const therapist = await Therapist.findById(userId);
  if (therapist) {
    const therapistWithoutPassword: Partial<ITherapist> = therapist.toObject();
    delete therapistWithoutPassword.password;
    return { user: therapist, type: "Therapist" };
  }

  return null;
}
