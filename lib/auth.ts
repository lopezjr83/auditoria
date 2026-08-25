import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Email from "next-auth/providers/email";
import { prisma } from "./prisma";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname.startsWith("/auth");

      if (isOnLoginPage) {
        return !isLoggedIn;
      }
      return isLoggedIn;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
} satisfies NextAuthConfig;
