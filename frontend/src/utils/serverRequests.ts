import axios from "axios";
import {
  apiClientRegister,
  apiGetAllTherapists,
  apiTherapistRegister,
} from "./apiEndpoints";

type ClientRegisterServerValues = {
  name: string;
  email: string;
  password: string;
  location: {
    type: string;
    coordinates: number[];
  };
};
type TherapistRegisterServerValues = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  speciality: string[];
  mediumCost: string;
  inscriptionNumber: string;
  location: {
    type: string;
    coordinates: number[];
  };
};

export const clientRegister = async (values: ClientRegisterServerValues) => {
  return await axios.post(apiClientRegister, values);
};

export const therapistRegister = async (
  values: TherapistRegisterServerValues
) => {
  return await axios.post(apiTherapistRegister, values);
};

export const getAllTherapists = async () => {
  return await axios.get(apiGetAllTherapists);
};
