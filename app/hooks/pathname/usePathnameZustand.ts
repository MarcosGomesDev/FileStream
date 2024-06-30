"use client";

import { create } from "zustand";
import { Pathname } from "./pathnameType";

const pathnameStore = create<Pathname>((set) => ({
  pathname: "",
  setPathname: (pathname: string) => {
    if (pathname === "/") {
      set({
        pathname: "",
      });
    } else if (pathname.includes("/folders/")) {
      set({
        pathname: pathname.replace("/folders/", ""),
      });
    }
  },
}));

export function usePathnameZustand(): Pathname {
  const pathname = pathnameStore((state) => state.pathname);
  const setPathname = pathnameStore((state) => state.setPathname);

  return {
    pathname,
    setPathname,
  };
}
