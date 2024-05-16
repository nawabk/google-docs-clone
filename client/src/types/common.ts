export type ErrorResponse = {
  status: "error";
  message: string;
};

export type SuccessfullResponse<T> = {
  status: "success";
  data: T;
};

export type APIResponse<T> = SuccessfullResponse<T> | ErrorResponse;
