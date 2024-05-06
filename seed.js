const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

  try {
    // Define the data to seed
    await  prisma.$connect()
    const coffeeDrinks = [
      { name: 'Espresso', price: 2.5, displayPrice: "2.50" },
      { name: 'Latte', price: 3.5, displayPrice: "3.50" },
      { name: 'Cappuccino', price: 3.0, displayPrice: "3.00" },
    ];

    // Seed the coffee drinks
    await prisma.coffeeDrinks.createMany({
      data: coffeeDrinks,
    });

    console.log('Seed completed successfully');
  } catch (error) {
    await prisma.$disconnect()
    console.error('Error seeding data:', error);
  } finally {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  }

