import Header from "@/components/Header";

import { AddButton } from "@/components/AddButton";
import { AddDialog } from "@/components/AddDialog";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div>
        {children}
        <AddButton />
        <AddDialog />
      </div>
    </>
  );
}
