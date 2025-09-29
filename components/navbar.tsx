"use client";

import { Button } from "@/components/ui/button";
import { Home, ArrowUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import WalletSummaryCard from "@/components/wallet-info";

export function Navbar() {
  const [active, setActive] = useState<"home" | "swaps">("swaps");
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-3 py-4">
            <div
              role="tablist"
              aria-label="Primary"
              className="inline-flex items-center gap-1 rounded-md border-2 border-border bg-panel/60 p-1 shadow-sm"
            >
              <button
                type="button"
                role="tab"
                aria-selected={active === "home"}
                onClick={() => setActive("home")}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors",
                  active === "home"
                    ? "bg-brand/20 text-brand"
                    : "text-foreground/80 hover:text-foreground",
                )}
              >
                <Home className="size-4" aria-hidden="true" />
                <span className="hidden sm:inline">Home</span>
                <span className="sr-only sm:not-sr-only sm:hidden">Home</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={active === "swaps"}
                onClick={() => setActive("swaps")}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors",
                  active === "swaps"
                    ? "bg-brand/20 text-brand"
                    : "text-foreground/80 hover:text-foreground",
                )}
              >
                <ArrowUpDown className="size-4" aria-hidden="true" />
                <span className="hidden sm:inline">Swaps</span>
                <span className="sr-only sm:not-sr-only sm:hidden">Swaps</span>
              </button>
            </div>

            <div className="hidden md:flex items-center flex-1 max-w-xl mx-4">
              <div className="flex w-full items-center gap-2 rounded-lg border border-border px-3 py-2">
                <Search className="size-4 text-muted-foreground" />
                <input
                  aria-label="Search"
                  placeholder="Search"
                  className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground/60"
                />
              </div>
            </div>

            <div className={"flex gap-3"}>
              <div
                className="flex items-center justify-center rounded-lg bg-panel px-2 border-border border-2"
                onClick={() => setOpen(true)}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={"/SOL.png"}
                  alt={"SOL Icon"}
                  width={26}
                  height={26}
                />
              </div>
              <Button
                onClick={() => setOpen(true)}
                className="rounded-lg bg-brand/20 text-brand hover:bg-brand/90 px-8"
              >
                Connect
              </Button>
            </div>
          </div>
        </div>
      </header>

      <Drawer direction={"right"} open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <WalletSummaryCard />
        </DrawerContent>
      </Drawer>
    </>
  );
}
