export type ErrorResponse = {
  status: "error";
  message: string;
};

type AuditField = { createdAt: string; updatedAt: string };
type ID = { _id: string };
export type GenericField = AuditField & ID;

export type SuccessfullResponse<T> = {
  status: "success";
  data: T;
};

export type APIResponse<T> = SuccessfullResponse<T> | ErrorResponse;
