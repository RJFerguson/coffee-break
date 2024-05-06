"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CoffeeDrink = {
  id: string;
  name: string;
  price: number;
};

export const columns: ColumnDef<CoffeeDrink>[] = [
  {
    accessorKey: "name",
    header: "Drink Name",
  },
  {
    accessorKey: "displayPrice",
    header: "Price",
  },
];
