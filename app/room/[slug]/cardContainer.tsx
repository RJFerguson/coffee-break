"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { OrderTable } from "./data-table";
import { useState } from "react";

export function CardContainer({ cofeeData }) {
  let mappableData = cofeeData || [];
  let [order, setOrder] = useState([]);
  let [total, setTotal] = useState(0);

  const handleClick = (idx) => {
    setOrder((prevItems) => {
      const newOrder = [...prevItems, mappableData[idx]];
      const newTotal = newOrder.reduce((acc, item) => acc + item.price, 0);
      setTotal(newTotal);
      return newOrder;
    });
  };

  return (
    <div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-md"
      >
        <CarouselContent>
          {mappableData.map((coff, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/4 md:basis-1/3 lg:basis-1/3"
            >
              <div className="p-1">
                <Card onClick={() => handleClick(index)}>
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-2">
                    <span className="text-1xl">{coff.name}</span>
                    <span className="text-md">${coff.displayPrice}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <OrderTable orders={order} total={total} />
    </div>
  );
}
