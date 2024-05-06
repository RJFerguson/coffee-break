"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  

  
  export function DebtTable({debts, totals}) {
    let mappedDebts = debts || []
    return (
      <Table>
        <TableCaption>A list of debts</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Debtor</TableHead>
            <TableHead>Creditor</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mappedDebts.map((debt, index) => (
            <TableRow key={index}>
              <TableCell>{debt.debtor}</TableCell>
              <TableCell>{debt.creditor}</TableCell>
              <TableCell className="text-right">{debt.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right">{Object.values(totals).reduce((acc, curr) => acc + curr, 0)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }