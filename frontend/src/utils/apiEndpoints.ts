import dotenv from "dotenv";
dotenv.config();

const env = process.env.NEXT_PUBLIC_NODE_ENV || "development";
const apiUrl =
  env === "development"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_CYPRESS_API_URL;

export const apiClientRegister = `${apiUrl}auth/client/register`;
export const apiClientLogin = `${apiUrl}auth/client/login`;
export const apiTherapistRegister = `${apiUrl}auth/therapist/register`;
export const apiTherapistLogin = `${apiUrl}auth/therapist/login`;
export const apiGetAllTherapists = `${apiUrl}search/getalltherapists`;
