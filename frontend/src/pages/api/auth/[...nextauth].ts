import { apiClientLogin, apiTherapistLogin } from "@/utils/apiEndpoints";
import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        userType: { label: "userType", type: "text" },
      },
      authorize: async (credentials): Promise<User | null> => {
        try {
          const apiUrl =
            credentials?.userType === "client"
              ? apiClientLogin
              : apiTherapistLogin;

          const response = await axios.post(apiUrl, {
            email: credentials?.email,
            password: credentials?.password,
          });

          const { token, user } = response.data;
          if (token && user) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              token: token,
            };
          }
        } catch (error) {
          console.error("Error authenticating user:", error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          token: token.token as string,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
