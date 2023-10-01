import type { ErrorRequestHandler } from "express";
import AppError from "../utils/appError";
// import { MongooseError } from "mongoose";
import { MongoError } from "mongodb";

type ErrorResponse = {
  status: string;
  message: string;
};

const hanldeDuplicateFieldsDB = (err: MongoError): AppError => {
  console.log(err.message);
  const valueArr = err.message.match(/email: '([^']+)'/);
  console.log(valueArr);
  let message = "Something went wrong",
    statusCode = 500;
  if (valueArr?.length) {
    const value = valueArr[1];
    message = `${value} already exist`;
    statusCode = 400;
  }
  return new AppError(message, 400);
};

const errorController: ErrorRequestHandler = (err, _1, res, _2) => {
  const errorResponse: ErrorResponse = {
    status: err.status || "error",
    message: err.message || "Something went wrong",
  };
  let statusCode = 500,
    status = "error",
    message = "Something went wrong";
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof MongoError) {
    if (err.code === 11000) {
      const modifiedErr = hanldeDuplicateFieldsDB(err);
      statusCode = modifiedErr.statusCode;
      message = modifiedErr.message;
    }
  }

  res.status(statusCode).json({ status, message });
};

export default errorController;
