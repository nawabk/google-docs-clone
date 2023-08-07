import type { ErrorRequestHandler } from "express";

type ErrorResponse = {
  statusCode: number;
  status: string;
  message: string;
};

const errorController: ErrorRequestHandler = (err, _1, res, _2) => {
  const errorResponse: ErrorResponse = {
    statusCode: err.statusCode || 500,
    status: err.status || "error",
    message: err.message || "Something went wrong",
  };
  console.log(err);

  res.send(errorResponse);
};

export default errorController;
