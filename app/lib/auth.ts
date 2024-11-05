import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        name: { label: "name", type: "text", placeholder: "Walter White" },
        email: {
          label: "email",
          type: "text",
          placeholder: "walter@heisenberg@gmail.com",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials) {
        const { name, email, password } = credentials || {};

        if (!name || !email || !password) {
          throw new Error("All fields are required");
        }

        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          const hashedPassword = await bcrypt.hash(password, 10);

          user = await prisma.user.create({
            data: {
              name,
              email,
              password: hashedPassword,
            },
          });
        } else {
          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }
        }

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || " ",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: { params: { scope: "read:user user:email" } },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      authorization: { params: { scope: "read:user user:email" } },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (session && session.user) {
        session.user.id = token.sub!;
      }

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
