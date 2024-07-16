import { z } from "zod";

export const createDocumentSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: "Please provide userId!",
    }),
    name: z.string().optional(),
  }),
});

export const editDocumentSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    content: z.string(),
  }),
});

export type CreateDocumentSchema = z.infer<typeof createDocumentSchema>;
