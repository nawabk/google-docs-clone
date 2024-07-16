import { GenericField } from "./common";

export type CreateDocumentRequest = {
  userId: string;
};

export type Document = GenericField & {
  name: string;
  content: string;
  createdBy: string;
  sharedWith: string[];
};
