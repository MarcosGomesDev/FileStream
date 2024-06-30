"use client";

import { Folder } from "@/app/interfaces/folder";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EllipsisVerticalIcon, File } from "lucide-react";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface FileCardProps extends HTMLAttributes<HTMLDivElement> {
  item: Folder;
}

export function FileCard({ item, className }: FileCardProps) {
  return (
    <Card className={twMerge(["h-44 min-w-[140px] max-w-[140px]", className])}>
      <CardContent className="flex w-full flex-col p-0">
        <div className="flex h-24 w-full items-center justify-center rounded-tl-md rounded-tr-md bg-primary">
          <File size={36} className="text-white" />
        </div>
        <div className="flex items-center justify-between px-1 py-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild className="overflow-hidden">
                <span className="cursor-pointer text-xs">{item.name}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Popover>
            <PopoverTrigger asChild className="right-2 flex self-end">
              <Button variant="ghost" size="icon">
                <EllipsisVerticalIcon size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40" side="right">
              <div className="flex flex-col">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(`${item.path}`);
                  }}
                >
                  Copiar link
                </Button>

                <Separator className="my-1" />

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(`${item.path}`);
                  }}
                >
                  Fazer download
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
}
