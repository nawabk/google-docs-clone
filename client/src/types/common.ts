export type ErrorResponse = {
  status: "error";
  message: string;
};

type AuditField = { createdAt: string; updatedAt: string };
type ID = { _id: string };
export type GenericField = AuditField & ID;

export type SuccessfullResponse<T, U extends boolean = false> = {
  status: "success";
  data: T;
} & (U extends true ? { totalPage: number; currPage: number } : object);

export type APIResponse<T> = SuccessfullResponse<T> | ErrorResponse;

export type PaginatedResponse<T> = APIResponse<T> & {
  totalPage: number;
  currPage: number;
};
