import { FolderCard } from "@/components/FolderCard";
import { StorageServiceFactory } from "@/services/storage.service";

export default async function Home() {
  const folders = await StorageServiceFactory.create().getFolders();

  return (
    <>
      <div className="container">
        <div className="py-5">
          <p className="text-xl font-semibold">Todos os arquivos</p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {folders.map((folder) => (
            <FolderCard
              key={folder.name}
              title={folder.name}
              href={`/folders/${folder.name}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
