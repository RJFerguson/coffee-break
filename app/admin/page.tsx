import { CoffeeDrink, columns } from "./columns";
import { CoffeeDrinkForm } from "./coffee-form";
import { DataTable } from "./data-table";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const revalidate = 0;

async function getData(): Promise<CoffeeDrink[]> {
  try {
    const response = await fetch(`${process.env.URL}/api/coffee`, {
      method: "GET",
    });
    return response.json();
  } catch {
    return [];
  }
}

export default async function Page() {
  const data = await getData();
  const { isAuthenticated, getUser } = getKindeServerSession();
  const userAuthenticated = await isAuthenticated();

  return (await isAuthenticated()) ? (
    <section className="container flex flex-col gap-4 pb-12 pt-4 text-center lg:items-center lg:gap-8 lg:py-20">
      <div className="flex flex-1 flex-col items-center gap-4 text-center lg:gap-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold lg:text-4xl">Drink Management</h1>
          <CoffeeDrinkForm />
        </div>
        <div>Existing Drinks</div>
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  ) : (
    <div className="flex flex-1 flex-col items-center gap-4 text-center lg:gap-8">
      Please Log in to manage drinks
    </div>
  );
}
