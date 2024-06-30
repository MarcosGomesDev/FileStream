import { z } from "zod";

export interface AddForm {
  type: string;
  name?: string;
  file?: any;
}

export const addFormSchema = z
  .object({
    type: z.string({
      required_error: "Selecione uma opção",
    }),
    name: z.string().optional(),
    file: z.any().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.type === "folder" && !values.name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Nome é obrigatório",
        path: ["name"],
      });
    } else if (values.type === "file" && !values.file) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Selecione um arquivo",
        path: ["file"],
      });
    }
  });

export type AddFormSchema = z.infer<typeof addFormSchema>;
