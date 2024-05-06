import * as React from "react";

import { cn } from "@/lib/utils";
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
import { useForm } from "react-hook-form";
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

type DrawerDialogExistingRoomProps = {
  title: string;
  subtitle: string;
};

export function DrawerDialogExistingRoom({
  title,
  subtitle,
}: DrawerDialogExistingRoomProps) {
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

          {/* <Button variant="outline">{title}</Button> */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Room ID</DialogTitle>
            <DialogDescription>
              Enter the Room ID shared with or created by you
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
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
          <DrawerTitle>Room ID</DrawerTitle>
          <DrawerDescription>
            Enter the Room ID shared with or created by you
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  const { toast } = useToast();
  const router = useRouter();

  const formSchema = z.object({
    room_id: z.string().min(4).max(4, {
      message: "Room must be 4 characters long.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      room_id: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(`/api/room/${values.room_id}`, {
        method: "GET",
      });
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("No Room Found");
        }
        throw new Error("Something went wrong");
      } else {
        router.push(`/room/${values.room_id}`);
      }
    } catch (e) {
      if (e.message === "No Room Found") {
        toast({
          variant: "destructive",
          title: "This room does not exist",
          description: "Submit an existing room id",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-2">
        <FormField
          control={form.control}
          name="room_id"
          render={({ field }) => (
            <FormItem>
              <FormControl className="px-2">
                <Input className="px-2" placeholder="idx4" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
