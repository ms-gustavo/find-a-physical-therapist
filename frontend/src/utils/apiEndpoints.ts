import dotenv from "dotenv";
dotenv.config();

const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

export const apiClientRegister = `${apiUrl}auth/client/register`;
export const apiClientLogin = `${apiUrl}auth/client/login`;
export const apiTherapistRegister = `${apiUrl}auth/therapist/register`;
export const apiTherapistLogin = `${apiUrl}auth/therapist/login`;
