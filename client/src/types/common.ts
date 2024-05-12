export type ErrorResponse = {
  statusCode: number;
  message: string;
};

type SuccessfullResponse<T> = {
  status: "success";
  data: T;
};

export type APIResponse<T> = SuccessfullResponse<T> | ErrorResponse;
