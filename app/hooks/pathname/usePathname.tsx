"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Pathname } from "./pathnameType";
import { usePathnameZustand } from "./usePathnameZustand";

function useGetPathname(): Pathname {
  return usePathnameZustand();
}

export function useGetCustomPathname(): Pathname {
  const path = usePathname();
  const { pathname, setPathname } = useGetPathname();

  useEffect(() => {
    setPathname(path);
  }, [path, setPathname]);

  return { pathname, setPathname };
}
