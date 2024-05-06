import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  try {
    const reqBody = await req.json();

    // Check if required fields are present in the request body
    if (!reqBody.drinkName || !reqBody.price) {
      throw new Error("Missing required fields: drinkName and price");
    }

    console.log(reqBody)

    let savePrice = (reqBody.price.toFixed(2))

    // Create a new coffee drink
    await prisma.coffeeDrinks.create({
      data: {
        name: reqBody.drinkName,
        price: parseFloat(savePrice),
        displayPrice: savePrice
      },
    });

    // Return a success response
    return NextResponse.json({ message: 'success' }, { status: 200 })
  } catch (error) {
    console.error("Error creating coffee drink:", error);
    // Return an error response
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(req: Request): Promise<Response> {
  try {
  let coffeeDrinks = await prisma.coffeeDrinks.findMany({})
    // Return a success response
    return NextResponse.json(coffeeDrinks, { status: 200 })
  } catch (error) {
    console.error("Error creating coffee drink:", error);
    // Return an error response
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}