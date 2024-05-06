"use client";

import Image from "next/image";
import HeadingText from "@/components/heading-text";
import { featureCards } from "@/config/contents";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { DrawerDialogExistingRoom } from "../drawer-existing-room";
import { DrawerDialogNewRoom } from "../drawer-new-room";

export default function FeatureCards() {
  const handleClick = () => {
    console.log("test");
  };

  const handleModal = () => {
    console.log("modal");
  };

  return (
    <section className="bg-slate-50 dark:bg-slate-900">
      <div className="container space-y-8 py-12 text-center lg:py-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {featureCards.content.map((cards) => {
            if (cards.id === 1) {
              return (
                <DrawerDialogNewRoom
                  key={1}
                  title={cards.text}
                  subtitle={cards.subtext}
                />
              );
            } else if (cards.id === 2) {
              return (
                <DrawerDialogExistingRoom
                  key={2}
                  title={cards.text}
                  subtitle={cards.subtext}
                />
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}
