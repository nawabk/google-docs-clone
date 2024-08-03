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

export enum DocPermission {
  Viewer = "Viewer",
  Editor = "Editor",
}

export type ShareDocumentRequest = {
  documentTitle: string;
  notificationMessage: string;
  notifyPeople: boolean;
  sharedWith: { user: string; email: string; access: DocPermission }[];
};
