"use client";

import { useAddDialog, useGetCustomPathname } from "@/app/hooks";
import {
  createFolderAction,
  uploadFileAction,
} from "@/server-actions/storage.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Dropzone, { DropzoneElement } from "../Dropzone";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { FloatingLabelInput } from "../ui/float-input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { AddForm, AddFormSchema, addFormSchema } from "./addFormSchema";

const options = {
  folder: "Pasta",
  file: "Arquivo",
} as const;

interface SelectOptions {
  options: keyof typeof options;
}

export function AddDialog() {
  const { addDialog, hideAddDialog } = useAddDialog();
  const [selectedOption, setSelectedOption] = useState<
    SelectOptions["options"] | null
  >(null);

  const dropzoneSingleRef = useRef<DropzoneElement>();

  const { pathname } = useGetCustomPathname();

  function handleCloseAddDialogClick() {
    hideAddDialog();
    setSelectedOption(null);
  }

  console.log(pathname);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    register,
    watch,
    trigger,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<AddFormSchema>({
    resolver: zodResolver(addFormSchema),
    mode: "onSubmit",
    defaultValues: {
      type: "",
      name: "",
      file: null,
    },
  });

  const type = watch("type");

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const errorTimeout = setTimeout(() => {
        clearErrors();
      }, 10000);

      return () => clearTimeout(errorTimeout);
    }

    const subscription = watch((_value, { name }) => {
      if (name === "type") {
        void trigger(["file", "name"]);
      }
    });

    return () => subscription.unsubscribe();
  }, [errors, clearErrors, watch, trigger]);

  async function clientAction(formData: AddForm) {
    setIsLoading(true);

    if (type === "folder") {
      const response = await createFolderAction({
        name: formData.name!,
        path: pathname,
      });

      if (response?.error) {
        // toast({
        //   title: "Uh oh! Algo deu errado",
        //   description: response.error.error.message,
        //   variant: "destructive",
        // });

        setIsLoading(false);
      }

      setIsLoading(false);

      hideAddDialog();
      reset();

      return;
    }

    const response = await uploadFileAction({
      file: formData.file!,
      path: pathname,
    });

    if (response?.error) {
      // toast({
      //   title: "Uh oh! Algo deu errado",
      //   description: response.error.error.message,
      //   variant: "destructive",
      // });

      setIsLoading(false);
    }

    setIsLoading(false);
    hideAddDialog();
    reset();
  }

  return (
    <Dialog open={addDialog} onOpenChange={handleCloseAddDialogClick}>
      <DialogContent className="w-11/12 rounded-lg">
        <DialogHeader>
          <DialogTitle>Adicionar</DialogTitle>
          <DialogDescription>
            Selecione o tipo que deseja adicionar
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(clientAction)}>
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between">
              <Label>Tipo</Label>
              {errors.type && (
                <div className="text-xs text-red-500">
                  {errors.type?.message || ""}
                </div>
              )}
            </div>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  onValueChange={(option) => {
                    field.onChange(option);
                    setSelectedOption(option as any);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tipos</SelectLabel>
                      {Object.entries(options).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            {selectedOption === "folder" && (
              <>
                <FloatingLabelInput
                  label="Nome da pasta"
                  className="focus-within:border-primary"
                  id="name"
                  error={errors.name}
                  {...register("name")}
                />
                {errors.name && (
                  <div className="text-xs text-red-500">
                    * {errors.name?.message || ""}
                  </div>
                )}
              </>
            )}

            {selectedOption === "file" && (
              <>
                <Controller
                  name="file"
                  control={control}
                  render={({ field }) => (
                    <Dropzone
                      {...field}
                      getRef={(el) => {
                        dropzoneSingleRef.current = el;
                      }}
                      options={{
                        url: "https://httpbin.org/post",
                        thumbnailWidth: 150,
                        maxFilesize: 0.5,
                        maxFiles: 1,
                        addRemoveLinks: true,
                        dictRemoveFile: "Remover",
                        dictMaxFilesExceeded: "Você só pode enviar um arquivo",
                        dictCancelUpload: "Cancelar",
                        dictRemoveFileConfirmation:
                          "Tem certeza que deseja remover?",
                        maxfilesexceeded(file) {
                          alert("Você só pode enviar um arquivo");
                          file.previewElement.remove();
                        },
                        addedfile(file) {
                          field.onChange(file);
                        },
                      }}
                      className="dropzone"
                    >
                      <div className="text-primary">
                        Arraste e solte um arquivo ou
                        <span className="block cursor-pointer underline">
                          {" "}
                          clique para selecionar
                        </span>
                      </div>
                    </Dropzone>
                  )}
                />

                {errors.file && (
                  <div className="text-xs text-red-500">
                    * {String(errors.file?.message || "")}
                  </div>
                )}
              </>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={handleCloseAddDialogClick}
              variant="outline"
            >
              Cancelar
            </Button>
            <Button type="submit">
              {isLoading ? "Carregando..." : "Adicionar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
