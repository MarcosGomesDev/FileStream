import { StorageServiceFactory } from "@/services/storage.service";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { FileCard } from "./components/FileCard";

interface FolderPageProps {
  params: {
    id: string;
  };
}

export default async function FolderPage({ params: { id } }: FolderPageProps) {
  const folder = await StorageServiceFactory.create().getFolder(id);

  return (
    <div className="container">
      <div className="flex w-full items-center gap-4">
        <Link href={"/"}>
          <ChevronLeftIcon />
        </Link>
        <p className="py-6 text-xl font-semibold">{id}</p>
      </div>
      {folder.data.length > 0 ? (
        <div className="grid grid-cols-2 justify-center justify-items-center gap-2 min-[450px]:grid-cols-3 min-[620px]:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
          {folder.data.map((item) => (
            <FileCard key={item.name} item={item} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
