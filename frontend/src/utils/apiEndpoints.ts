import dotenv from "dotenv";
dotenv.config();

const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

export const apiClientRegister = `${apiUrl}auth/client/register`;
