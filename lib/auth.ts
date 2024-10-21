import User from "@/models/User";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
// import { connectDB } from "@/lib/auth"; // Ensure the correct import path for connectDB
import mongoose from "mongoose";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectDB();
                const user = await User.findOne({
                    email: credentials?.email,
                }).select("+password");

                if (!user) throw new Error("Wrong Email");

                const passwordMatch = await bcrypt.compare(
                    credentials!.password,
                    user.password
                );

                if (!passwordMatch) throw new Error("Wrong Password");
                return user;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account && (account.provider === "google")) {
                return true;
            }
            return true;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl;
        },
    },
};


// Exporting connectDB properly
export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        // If the connection is already open, return to avoid creating a new one.
        return;
    }

    try {
        const mongoUri = process.env.MONGODB_URI as string;

        await mongoose.connect(mongoUri); // Connect without deprecated options
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error('Failed to connect to MongoDB');
    }
};