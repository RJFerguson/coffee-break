import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
export const dynamic = "force-dynamic";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    let room = await prisma.room.findFirstOrThrow({
      where: {
        uuid: params.id,
      },
    });
    // Return a success response
    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    console.error("Error looking for room", error);
    return NextResponse.json({ error: "No Room Found" }, { status: 404 });
  }
}


export async function POST(req: Request): Promise<Response> {
  try {
    const reqBody = await req.json();

    const { orders, paidBy, room, date } = reqBody;

    if (!orders || !Array.isArray(orders) || orders.length === 0) {
      throw new Error("Missing or invalid 'orders' array in the request body");
    }
    if (!paidBy || typeof paidBy !== 'string') {
      throw new Error("Missing or invalid 'paidBy' field in the request body");
    }
    if (!room || typeof room !== 'string') {
      throw new Error("Missing or invalid 'room' field in the request body");
    }
    if (!date || typeof date !== 'string') {
      throw new Error("Missing or invalid 'date' field in the request body");
    }

    for (const order of orders) {
      if (!order.id || typeof order.id !== 'number') {
        throw new Error("Missing or invalid 'id' field in one of the orders");
      }
      if (!order.price || typeof order.price !== 'number') {
        throw new Error("Missing or invalid 'price' field in one of the orders");
      }
      if (!order.displayPrice || typeof order.displayPrice !== 'string') {
        throw new Error("Missing or invalid 'displayPrice' field in one of the orders");
      }
      if (!order.recipient || typeof order.recipient !== 'string') {
        throw new Error("Missing or invalid 'recipient' field in one of the orders");
      }

      await prisma.order.create({
        data: {
          order_date: new Date(date),
          room: { connect: { uuid: room } },
          price: order.price,
          recip: order.recipient,
          displayPrice: order.displayPrice,
          total: order.price,
          paid_by: paidBy,
        },
      });
    }

    return NextResponse.json({ message: 'success' }, { status: 200 })
  } catch (error) {
    console.error("Error creating orders:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
