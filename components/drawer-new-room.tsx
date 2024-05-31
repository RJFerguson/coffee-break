import * as React from "react";

import { generateRandomSequence } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type DrawerDialogNewRoomProps = {
  title: string;
  subtitle: string;
};

export function DrawerDialogNewRoom({
  title,
  subtitle,
}: DrawerDialogNewRoomProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { toast } = useToast();
  const router = useRouter();

  const handleCreateRoom = async () => {
    const newRandomSequence = generateRandomSequence(4);
    try {
      const response = await fetch(`/api/room`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRandomSequence),
      });
      if (!response.ok) {
        throw new Error("No Room Found");
      }
      router.push(`/room/${newRandomSequence}`);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Card
            key={title}
            className="flex flex-grow flex-col items-center justify-between gap-4 p-8 dark:bg-secondary"
            onClick={handleCreateRoom}
          >
            <div className="space-y-2">
              <CardTitle>{title}</CardTitle>
              <CardDescription>{subtitle}</CardDescription>
            </div>
          </Card>
        </DialogTrigger>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Card
          key={title}
          className="flex flex-grow flex-col items-center justify-between gap-4 p-8 dark:bg-secondary"
          onClick={handleCreateRoom}
        >
          <div className="space-y-2">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </div>
        </Card>
      </DrawerTrigger>
    </Drawer>
  );
}
