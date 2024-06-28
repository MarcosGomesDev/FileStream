"use client";

import { FolderIcon } from "lucide-react";
import Link from "next/link";

interface FolderCardProps {
  href: string;
  title: string;
}

export function FolderCard({ href, title }: FolderCardProps) {
  return (
    <Link href={href} className="flex items-center gap-2 rounded-md border p-5">
      <FolderIcon className="text-primary" />
      <p className="font-semibold">{title}</p>
    </Link>
  );
}
