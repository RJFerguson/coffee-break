import { QuickActionsMenu } from "../quickActionsMenu";
import { DebtTable } from "./debtTable";
import { TotalsTable } from "./totalTable";

export const revalidate = 0;

async function getData(id): Promise<[]> {
  try {
    const response = await fetch(`${process.env.URL}/api/room/${id}/history`, {
      method: "GET",
    });
    return response.json();
  } catch {
    return [];
  }
}

function DataMung(orders) {
  const totals = {};
  orders.forEach(order => {
    const { recip, paid_by, price } = order;

    if (!totals[recip]) totals[recip] = 0;
    if (!totals[paid_by]) totals[paid_by] = 0;

    totals[recip] -= price; 
    totals[paid_by] += price;
  });

  return totals;
}

function calculateDebts(totals) {
  const debts = [];

  Object.entries(totals).forEach(([person, total]) => {
    if (total > 0) {
      // If person has a positive total (owing money)
      Object.entries(totals).forEach(([otherPerson, otherTotal]) => {
        if (total > 0 && otherTotal < 0) {
          // If person owes money and otherPerson is owed money
          const amountOwed = Math.min(-otherTotal, total);
          debts.push({
            debtor: person,
            creditor: otherPerson,
            amount: amountOwed,
          });
          // Reduce the owed amount from the total
          total -= amountOwed;
        }
      });
    }
  });

  return debts;
}

export default async function Page({
  params,
}) {
  const data = await getData(params.slug);
  console.log(data)
  const totals = DataMung(data)
  const debts = calculateDebts(totals);
  console.log(totals)
  return (
    <section className="container flex flex-col gap-4 pb-12 pt-4 text-center lg:items-center lg:gap-8 lg:py-20">
      <QuickActionsMenu />
      <div className="flex flex-1 flex-col items-center gap-4 text-center lg:gap-8">
        <div className="space-y-4">
          <h1 className="text-xl font-bold lg:text-2xl">order history</h1>
        </div>
    <DebtTable debts={debts} totals={totals} />
    <TotalsTable totals={totals} />
      </div>
    </section>
  );
}
