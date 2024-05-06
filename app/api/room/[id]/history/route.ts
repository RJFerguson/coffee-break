import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } },
  ) {
    try {
        const roomId = params.id
    
        // Find the room details
        const room = await prisma.room.findUnique({
          where: {
            uuid: roomId,
          },
        });
    
        if (!room) {
          throw new Error("Room not found");
        }
    
        // Find the aggregate amounts owed and owing
        const aggregateResult = await prisma.order.findMany({
            where: {
                room_id: room.id
            }
        })


        console.log(aggregateResult.length)


        // Return the combined result
        return NextResponse.json(aggregateResult, { status: 200 });
      } catch (error) {
        console.error("Error looking for room", error);
        return NextResponse.json({ error: error.message || "No Room Found" }, { status: 404 });
      } finally {
        await prisma.$disconnect();
      }
  }
  
  