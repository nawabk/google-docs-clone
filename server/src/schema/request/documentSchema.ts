import { z } from "zod";

export const createDocumentSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: "Please provide userId!",
    }),
    name: z.string().optional(),
  }),
});

export type CreateDocumentSchema = z.infer<typeof createDocumentSchema>;
