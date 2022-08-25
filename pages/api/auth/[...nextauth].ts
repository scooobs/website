import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../prisma/db";

const prismaClient = prisma;

export default NextAuth({
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GithubProvider({
      clientId:
        process.env.NODE_ENV === "production"
          ? process.env.GITHUB_CLIENT_ID
          : process.env.GITHUB_LOCAL_CLIENT_ID,
      clientSecret:
        process.env.NODE_ENV === "production"
          ? process.env.GITHUB_CLIENT_SECRET
          : process.env.GITHUB_LOCAL_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
        });
        session.user = dbUser;
      }
      return session;
    },
  },
});
