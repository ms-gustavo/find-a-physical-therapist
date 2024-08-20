import axios from "axios";
import {
  apiClientRegister,
  apiGetAllTherapists,
  apiGetTherapistsByName,
  apiGetTherapistsByQuery,
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

export const getAllTherapists = async (currentPage: number, limit = 6) => {
  return await axios.get(apiGetAllTherapists, {
    params: {
      page: currentPage,
      limit: limit,
    },
  });
};

export const getTherapistsByName = async (
  name: string,
  currentPage: number
) => {
  const response = await axios.get(apiGetTherapistsByName, {
    params: {
      name: name,
      page: currentPage,
    },
  });
  if (response.status !== 200) {
    return [];
  }
  return response.data;
};

export const getTherapistsByQuery = async (query: any, currentPage: number) => {
  const response = await axios.get(apiGetTherapistsByQuery, {
    params: {
      query: query,
      page: currentPage,
    },
  });
  return response.data;
};
