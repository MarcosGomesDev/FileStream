"use server";

import { StorageServiceFactory } from "@/services/storage.service";
import { revalidatePath } from "next/cache";

export async function createFolderAction({
  name,
  path,
}: {
  name: string;
  path: string;
}) {
  const storageService = StorageServiceFactory.create();
  const error = await storageService.createFolder({ name, path });

  const revalidationPath = path === "" ? "/" : `/folders/${path}`;

  revalidatePath(revalidationPath);

  if (error) {
    return {
      error: error,
    };
  }

  return {
    success: true,
  };
}

export async function uploadFileAction({
  file,
  path,
}: {
  file: File;
  path: string;
}) {
  const storageService = StorageServiceFactory.create();
  const error = await storageService.uploadFile({ file, path });

  if (error) {
    return {
      error: error,
    };
  }

  return {
    success: true,
  };
}
