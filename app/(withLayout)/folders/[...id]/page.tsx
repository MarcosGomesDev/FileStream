import { Folder } from "@/app/interfaces/folder";
import { FolderCard } from "@/components/FolderCard";
import { StorageServiceFactory } from "@/services/storage.service";
import Image from "next/image";
import { FileCard } from "./components/FileCard";
import { Header } from "./components/Header";

interface FolderPageProps {
  params: {
    id: string;
  };
}

export default async function FolderPage({ params: { id } }: FolderPageProps) {
  const folder = await StorageServiceFactory.create().getFolder(id);

  return (
    <div className="container">
      <Header title={id} />
      {folder.data.length > 0 ? (
        <div className="mt-6 space-y-12">
          <div className="grid grid-cols-2 justify-center justify-items-center gap-2 min-[450px]:grid-cols-3 min-[620px]:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
            {folder.data
              .filter((item: Folder) => item.tag === "folder")
              .map((item: Folder) => (
                <FolderCard
                  key={item.name}
                  href={`/folders/${item.path}`}
                  title={item.name}
                />
              ))}
          </div>
          <div className="grid grid-cols-2 justify-center justify-items-center gap-2 min-[450px]:grid-cols-3 min-[620px]:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
            {folder.data
              .filter((item: Folder) => item.tag === "file")
              .map((item: Folder) => (
                <FileCard key={item.name} item={item} />
              ))}
          </div>
        </div>
      ) : (
        <div className="flex h-[79vh] flex-col items-center justify-center gap-3">
          <Image
            src={"/empty-data.svg"}
            width={350}
            height={350}
            priority
            className="-mt-12"
            alt="Nenhum dado encontrado"
          />
          <p className="text-center text-2xl font-semibold">
            Nenhum arquivo ou pasta encontrado
          </p>
        </div>
      )}
    </div>
  );
}
