export type GenericResponse<T> = {
  status: "success";
  data: T;
};

export type PaginatedResponse<T> = GenericResponse<T> & {
  currPage: number;
  totalPage: number;
};

export type ID = { _id: any };
