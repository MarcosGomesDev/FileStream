/* eslint-disable no-unused-vars */
import { AuthService } from "./auth.service";

export class StorageService {
  constructor(private authService: AuthService) {}

  async getFolders() {
    const response = await fetch(
      `${process.env.BASE_URL}/storage/get-folders`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      },
    );

    if (!response.ok) {
      const error = await response.json();

      return { error };
    }

    return await response.json();
  }

  async getFolder(path: string) {
    if (Array.isArray(path) && path.length > 1) {
      path = path.join("/");
    } else if (Array.isArray(path)) {
      path = path[0];
    }

    if (path.includes("/folders/")) {
      path = path.replace("/folders/", "");
    }

    const response = await fetch(
      `${process.env.BASE_URL}/storage/get-folder?path=${path}`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      },
    );

    if (response.status === 401) {
      return { error: "Credenciais inválidas" };
    }

    if (!response.ok) {
      const error = await response.json();

      return { error };
    }

    return await response.json();
  }

  async createFolder(input: { name: string; path: string }) {
    const formattedPath =
      input.path !== "" ? `${input.path}/${input.name}` : input.name;

    const response = await fetch(
      `${process.env.BASE_URL}/storage/create-folder?path=${formattedPath}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      },
    );

    if (response.status === 401) {
      return { error: "Credenciais inválidas" };
    }

    if (!response.ok) {
      const error = await response.json();

      return { error };
    }

    return await response.json();
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

    if (!response.ok) {
      const error = await response.json();

      return { error };
    }

    return await response.json();
  }
}

export const StorageServiceFactory = {
  create: () => new StorageService(new AuthService()),
};
