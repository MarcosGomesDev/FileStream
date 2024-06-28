"use client";

import { create } from "zustand";
import { AddDialog } from "./addDialogType";

const addDialogStore = create<AddDialog>((set) => ({
  addDialog: false,
  showAddDialog: () =>
    set({
      addDialog: true,
    }),
  hideAddDialog: () =>
    set({
      addDialog: false,
    }),
}));

export function useAddDialogZustand(): AddDialog {
  const addDialog = addDialogStore((state) => state.addDialog);
  const showAddDialog = addDialogStore((state) => state.showAddDialog);
  const hideAddDialog = addDialogStore((state) => state.hideAddDialog);

  return {
    addDialog,
    showAddDialog,
    hideAddDialog,
  };
}
