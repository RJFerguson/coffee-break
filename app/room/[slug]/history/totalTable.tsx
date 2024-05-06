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
  

  


export function TotalsTable({ totals }) {
    
    return (
      <Table>
        <TableCaption>Totals</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Person</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(totals).map(([person, total]) => (
            <TableRow key={person}>
              <TableCell>{person}</TableCell>
              <TableCell className="text-right">{total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell className="text-right">{Object.values(totals).reduce((acc, curr) => acc + curr, 0)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }