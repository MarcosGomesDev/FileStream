"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

export function Header({ title }: { title: any }) {
  return (
    <div className="flex w-full items-center gap-4">
      <Button variant="ghost">
        <Link
          href={
            title.length > 1
              ? `/folders/${title.slice(0, title.length - 1).join("/") as string}`
              : "/"
          }
        >
          <ChevronLeftIcon />
        </Link>
      </Button>
      <p className="py-6 text-xl font-semibold">
        {Array.isArray(title) && title.length > 1
          ? title[title.length - 1]
          : title}
      </p>
    </div>
  );
}
