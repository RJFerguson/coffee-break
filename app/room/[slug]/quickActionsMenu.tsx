"use client";

import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function QuickActionsMenu() {
  const params = useParams<{ tag: string; item: string }>();

  return (
    <div>
      <div className="flex h-5 items-center space-x-4 text-sm">
        <Link href="/">
          <div>Home</div>
        </Link>
        <Separator orientation="vertical" />
        <Link href={`/room/${params.slug}`}>
          <div>New Order</div>
        </Link>
        <Separator orientation="vertical" />
        <Link href={`/room/${params.slug}/history`}>
          <div>Order History</div>
        </Link>
      </div>
    </div>
  );
}
