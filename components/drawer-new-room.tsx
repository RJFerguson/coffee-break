import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
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

type DrawerDialogNewRoomProps = {
  title: string;
  subtitle: string;
};

export function DrawerDialogNewRoom({
  title,
  subtitle,
}: DrawerDialogNewRoomProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Card
            key={title}
            className="flex flex-grow flex-col items-center justify-between gap-4 p-8 dark:bg-secondary"
            // onClick={}
          >
            <div className="space-y-2">
              <CardTitle>{title}</CardTitle>
              <CardDescription>{subtitle}</CardDescription>
            </div>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Room</DialogTitle>
            <DialogDescription>
              Add some default info to make this easier for everyone
            </DialogDescription>
          </DialogHeader>
          <UserGroupForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Card
          key={title}
          className="flex flex-grow flex-col items-center justify-between gap-4 p-8 dark:bg-secondary"
        >
          <div className="space-y-2">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </div>
        </Card>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Create Room</DrawerTitle>
          <DrawerDescription>
            Add some default info to make this easier for everyone
          </DrawerDescription>
        </DrawerHeader>
        <UserGroupForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function UserGroupForm({ className }: React.ComponentProps<"form">) {
  const handleSubmit = () => {
    console.log("test");
  };

  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="numUsers"></Label>
        <Input type="number" id="numUsers" defaultValue="4" />
      </div>
      <Button type="submit" onClick={handleSubmit}>
        Create!
      </Button>
    </form>
  );
}
