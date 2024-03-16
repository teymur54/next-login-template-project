import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            "http://172.16.4.160:8080/api/auth/login",
            {
              username: credentials?.username,
              password: credentials?.password,
            }
          );

          const user = res.data;

          if (res.status === 200 && user) {
            return user;
          } else return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
