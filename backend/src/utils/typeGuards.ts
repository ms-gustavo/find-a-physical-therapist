import { ITherapist } from "../models/Therapist";

export function isTherapist(user: any): user is ITherapist {
  return (
    (user as ITherapist).speciality !== undefined &&
    (user as ITherapist).inscriptionNumber !== undefined
  );
}
