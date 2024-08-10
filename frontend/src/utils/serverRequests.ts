import axios from "axios";
import { apiClientRegister } from "./apiEndpoints";

type ClientRegisterServerValues = {
  name: string;
  email: string;
  password: string;
  location: {
    type: string;
    coordinates: number[];
  };
};

export const clientRegister = async (values: ClientRegisterServerValues) => {
  return await axios.post(apiClientRegister, values);
};
