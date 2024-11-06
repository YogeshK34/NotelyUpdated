import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/app/lib/auth";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  // get the user session
  const session = await getServerSession(authOptions);

  // check if the user is authenticated
  if (!session || !session.user.id) {
    return NextResponse.json(
      { message: "Unauthorzed. Kindly signup!" },
      { status: 401 },
    );
  }

  const body = await req.json();

  try {
    const createNotes = await prisma.notes.create({
      data: {
        title: body.title,
        note: body.note,
        user: { connect: { id: Number(session.user.id) } },
      },
    });

    return NextResponse.json(
      {
        message: "Note created successfully",
        createNotes,
      },
      { status: 201 },
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: e,
      },
      { status: 411 },
    );
  }
}

// GET endpoint to retrieve all the posts

export async function GET() {
  try {
    const notes = await prisma.notes.findMany();

    return NextResponse.json({ notes }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Error fetching notes",
        e,
      },
      { status: 411 },
    );
  }
}
