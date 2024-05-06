import * as React from "react";

import { cn, generateRandomSequence } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Image from "next/image";
import HeadingText from "@/components/heading-text";
import { featureCards } from "@/config/contents";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
