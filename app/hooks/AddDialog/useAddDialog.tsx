"use client";

import { AddDialog } from "./addDialogType";
import { useAddDialogZustand } from "./useAddDialogZustand";

export function useAddDialog(): AddDialog {
  return useAddDialogZustand();
}
