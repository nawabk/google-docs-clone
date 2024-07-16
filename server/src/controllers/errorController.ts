import type { ErrorRequestHandler } from "express";
import AppError from "../utils/appError";
// import { MongooseError } from "mongoose";
import { MongoError } from "mongodb";
import { CastError, MongooseError } from "mongoose";
import { ZodError } from "zod";

type ErrorResponse = {
  status: string;
  message: string;
};

const hanldeDuplicateFieldsDB = (err: MongoError): AppError => {
  const valueArr = err.message.match(/email: "([^"]+)"/);
  let message = "Something went wrong",
    statusCode = 500;
  if (valueArr?.length) {
    const value = valueArr[1];
    message = `${value} already exist`;
    statusCode = 400;
  }
  return new AppError(message, 400);
};

const handleCastError = (err: CastError) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

function isMongooseCastError(err: MongooseError): err is CastError {
  return err.name === "CastError";
}

const errorController: ErrorRequestHandler = (err, _1, res, _2) => {
  let statusCode = 500,
    status = "error",
    message = "Something went wrong";
  console.log(err);
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof MongoError) {
    if (err.code === 11000) {
      const modifiedErr = hanldeDuplicateFieldsDB(err);
      statusCode = modifiedErr.statusCode;
      message = modifiedErr.message;
    }
  } else if (err instanceof MongooseError) {
    if (isMongooseCastError(err)) {
      ({ statusCode, message } = handleCastError(err));
    } else {
      message = err.message;
    }
  } else if (err instanceof ZodError) {
    message = err.errors[0].message;
  } else if (err instanceof Error) {
    message = err.message;
  }
  res.status(statusCode).json({ status, message });
};

export default errorController;
