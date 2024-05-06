import { CardContainer } from "./cardContainer";
import { QuickActionsMenu } from "./quickActionsMenu";

export const revalidate = 0;

async function getData(): Promise<[]> {
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
  return (
    <section className="container flex flex-col gap-4 pb-12 pt-4 text-center lg:items-center lg:gap-8 lg:py-20">
      <QuickActionsMenu />
      <div className="flex flex-1 flex-col items-center gap-4 text-center lg:gap-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold lg:text-4xl">
            Add drinks from the carousel below{" "}
          </h1>
        </div>
        <div className="container">
          <CardContainer cofeeData={data} />
        </div>
      </div>
    </section>
  );
}
