// "use server";

// import prisma from "@/lib/prisma";

// export async function createCoffeeDrink(data: FormData) {
//   const name = data.get("drinkName") as string;
//   const price = data.get("price") as number;

//   await prisma.coffeeDrinks.create({
//     data: {
//        name,
//         price,
//     },
//   });

//   return { success: true };
// }
