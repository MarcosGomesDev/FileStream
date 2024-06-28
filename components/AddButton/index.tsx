"use client";

import { useAddDialog } from "@/app/hooks";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";

export function AddButton() {
  const { showAddDialog } = useAddDialog();

  return (
    <>
      <Button
        className="fixed bottom-8 right-5 z-50 size-14 rounded-full"
        size="icon"
        onClick={showAddDialog}
      >
        <PlusIcon size={24} />
      </Button>
    </>
  );
}
