import { apiClientLogin } from "@/utils/apiEndpoints";
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
      },
      authorize: async (credentials): Promise<User | null> => {
        try {
          const response = await axios.post(apiClientLogin, {
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
