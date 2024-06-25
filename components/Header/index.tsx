"use client";

import { CloudyIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <div className="sticky top-0 z-50 mb-4 flex h-16 w-full items-center border-b-[0.4px] bg-background shadow-md">
      <div className="container flex items-center justify-between py-5">
        <Link href="/" className="flex items-center gap-2 text-xl">
          <CloudyIcon size={28} className="-mt-1 text-primary" />
          <h1 className="font-semibold text-primary">FileStream</h1>
        </Link>

        <Button
          size="icon"
          variant="outline"
          className="border-none bg-transparent shadow-md"
          // onClick={showSideMenu}
          aria-label="Abrir menu lateral"
        >
          <MenuIcon className="text-primary" />
        </Button>
      </div>
    </div>
  );
}
