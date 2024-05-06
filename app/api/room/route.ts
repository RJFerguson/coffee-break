import prisma from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(req: Request): Promise<Response> {
  try {
    const reqBody = await req.json();
    if (!reqBody) {
      throw new Error("Missing UUID");
    }

    await prisma.room.create({
      data: {
        uuid: reqBody,
      },
    });

    // Return a success response
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.error("Error creating room:", error);
    // Return an error response
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
