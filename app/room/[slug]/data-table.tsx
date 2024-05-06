"use client";

import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { DatePickerApp } from "./date-picker";
import { format } from "date-fns";

import { toast, useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import router from "next/router";

export function OrderTable(props: any) {
  const params = useParams<{ tag: string; item: string }>();
  const [inputValues, setInputValues] = useState({}); // State to store input values
  const [paidByName, setPaidBy] = useState("");
  const [date, setDate] = useState<Date>();

  // Function to update input value in state
  const handleInputChange = (e: any, orderId: any) => {
    const { value } = e.target;
    setInputValues((prevState) => ({
      ...prevState,
      [orderId]: value,
    }));
  };

  const handlePaidBy = (e: any) => {
    const { value } = e.target;
    setPaidBy(value);
  };

  const handleSubmit = async () => {
    
    const orderObject = {
      orders: data.map((order: any) => ({
        id: order.id,
        price: order.price,
        displayPrice: order.displayPrice,
        recipient: inputValues[order.id] || "", // Get recipient from paidByName if available
      })),
      paidBy: paidByName,
      room: params.slug,
      date: format(date, "MM-dd-yyyy"),
    };


    try {
      const response = await fetch(`/api/room/${params.slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderObject),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      } else {
        toast({
          title: "Success!",
          description: "Your Coffee was saved",
        });
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      console.log(e);
    }



  };

  let data = props.orders || [];
  return (
    <div className="flex flex-col">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Drink</TableHead>
            <TableHead>Recipient</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((ord, idx) => (
            <TableRow key={ord.id + idx}>
              <TableCell className="font-medium">{ord.name}</TableCell>
              <TableCell>
                <Input
                  value={inputValues[ord.id] || ""}
                  onChange={(e) => handleInputChange(e, ord.id)}
                />
              </TableCell>
              <TableCell className="text-right">${ord.displayPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              ${parseFloat(props.total).toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="py-4 flex space-between flex-row">
        <div className="px-8">
          {" "}
          <Input
            value={paidByName}
            onChange={handlePaidBy}
            placeholder="Paid By"
          />
        </div>
        <div className="px-8">
          <DatePickerApp date={date} setDate={setDate} />
        </div>
        <div className="px-4">
          <Button onClick={() => handleSubmit()}>Submit Order</Button>
        </div>
      </div>
    </div>
  );
}
