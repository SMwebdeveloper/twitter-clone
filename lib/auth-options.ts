import { AuthOptions } from "next-auth";
import { connectDatabase } from "./mongoose";
import User from "@/database/user.models";

import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDatabase();

        const user = await User.findOne({
          email: credentials?.email,
        });

        return user;
      },
    }),
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT!,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT!,
    }),
  ],
  callbacks: {
    async session({ session, token, user }: any) {
      await connectDatabase();

      const isExistingUser = await User.findOne({ email: session.user.email });

      if (!isExistingUser) {
        const newUser = await User.create({
          email: session.user.email,
          name: session.user.name,
          profileImage: session.user.image,
        });

        session.currentUser = newUser;
      } else {
        session.currentUser = isExistingUser;
      }

      return session;
    },
  },
  session: { strategy: "jwt" },
  jwt: { secret: process.env.NEXT_PUBLIC_JWT_SECRET! },
  secret: process.env.NEXT_PUBLIC_SECRET!,
};
