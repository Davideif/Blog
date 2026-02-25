import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Wrong password");
        }

        return {
          id: user._id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };