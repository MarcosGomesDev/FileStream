"use client";

import { useAddDialog } from "@/app/hooks";
import { useRef, useState } from "react";
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

  function handleCloseAddDialogClick() {
    hideAddDialog();
    setSelectedOption(null);
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
        <div className="grid gap-4 py-4">
          <Label>Tipo</Label>
          <Select onValueChange={(option) => setSelectedOption(option as any)}>
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

          {selectedOption === "folder" && (
            <>
              <FloatingLabelInput
                label="Nome da pasta"
                className="focus-within:border-primary"
              />
            </>
          )}

          {selectedOption === "file" && (
            <Dropzone
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
                dictRemoveFileConfirmation: "Tem certeza que deseja remover?",
                maxfilesexceeded(file) {
                  alert("Você só pode enviar um arquivo");
                  file.previewElement.remove();
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
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleCloseAddDialogClick}
            variant="outline"
          >
            Cancelar
          </Button>
          <Button type="submit">Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
