export type GenericResponse<T> = {
  status: "success";
  data: T;
};

export type ID = { _id: any };
