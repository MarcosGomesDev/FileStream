/* eslint-disable no-unused-vars */
import { Folder } from "@/app/interfaces/folder";
import { AuthService } from "./auth.service";

export class StorageService {
  constructor(private authService: AuthService) {}

  async getFolders(): Promise<Folder[]> {
    const response = await fetch(
      `${process.env.BASE_URL}/storage/get-folders`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      },
    );

    return await response.json();
  }

  async getFolder(path: string) {
    const response = await fetch(
      `${process.env.BASE_URL}/storage/get-folder?path=${path}`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      },
    );

    return response.json();
  }

  async createFolder(input: { name: string; path: string }) {
    const response = await fetch(
      `${process.env.BASE_URL}/storage/create-folder`,
      {
        method: "POST",
        body: JSON.stringify({
          name: input.name,
        }),
      },
    );

    return response.json();
  }

  async uploadFile(input: { file: File; path: string }) {
    const formData = new FormData();
    formData.append("file", input.file);

    const response = await fetch(
      `${process.env.BASE_URL}/storage/upload-file?path=${input.path}`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      },
    );

    return response.json();
  }
}

export const StorageServiceFactory = {
  create: () => new StorageService(new AuthService()),
};
