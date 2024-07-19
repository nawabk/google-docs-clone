import { z } from "zod";

export const documentIdParams = z.object({
  params: z.object({
    documentId: z.string(),
  }),
});

export const createDocumentSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: "Please provide userId!",
    }),
    name: z.string().optional(),
  }),
});

export const getDocumentSchema = z.object({}).merge(documentIdParams);

export const updateDocumentNameSchema = z
  .object({
    body: z.object({
      name: z.string(),
    }),
  })
  .merge(documentIdParams);

export const shareDocumenSchema = z
  .object({
    body: z.object({
      sharedWith: z.array(
        z.object({
          user: z.string(),
          access: z.enum(["Editor", "Viewer"]),
        })
      ),
    }),
  })
  .merge(documentIdParams);

export type CreateDocumentSchema = z.infer<typeof createDocumentSchema>;
export type GetDocumentSchema = z.infer<typeof getDocumentSchema>;
export type UpdateDocumentNameSchema = z.infer<typeof updateDocumentNameSchema>;
export type ShareDocumenSchema = z.infer<typeof shareDocumenSchema>;
export type DocumentIdParams = z.infer<typeof documentIdParams>;
