import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();

  // validate the inputs
  if (!body.name || !body.email || !body.password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 },
    );
  }
  try {
    // hash the password before saving in DB
    const hashedPassword = await bcrypt.hash(body.password, 10);

    await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Signed in successfully" },
      { status: 201 },
    );
  } catch (e: unknown) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // Check if e is a known Prisma erro
      //unique constraint failed
      if (e.code === "P2002") {
        return NextResponse.json(
          { message: "Email already in use" },
          { status: 409 },
        );
      }
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  } finally {
    //close Prisma Connection
    await prisma.$disconnect();
  }
}
