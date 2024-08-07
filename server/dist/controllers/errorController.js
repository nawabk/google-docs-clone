"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../utils/appError"));
// import { MongooseError } from "mongoose";
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const hanldeDuplicateFieldsDB = (err) => {
    const valueArr = err.message.match(/email: "([^"]+)"/);
    let message = "Something went wrong", statusCode = 500;
    if (valueArr === null || valueArr === void 0 ? void 0 : valueArr.length) {
        const value = valueArr[1];
        message = `${value} already exist`;
        statusCode = 400;
    }
    return new appError_1.default(message, 400);
};
const handleCastError = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new appError_1.default(message, 400);
};
function isMongooseCastError(err) {
    return err.name === "CastError";
}
const errorController = (err, _1, res, _2) => {
    let statusCode = 500, status = "error", message = "Something went wrong";
    console.log(err);
    if (err instanceof appError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof mongodb_1.MongoError) {
        if (err.code === 11000) {
            const modifiedErr = hanldeDuplicateFieldsDB(err);
            statusCode = modifiedErr.statusCode;
            message = modifiedErr.message;
        }
    }
    else if (err instanceof mongoose_1.MongooseError) {
        if (isMongooseCastError(err)) {
            ({ statusCode, message } = handleCastError(err));
        }
        else {
            message = err.message;
        }
    }
    else if (err instanceof zod_1.ZodError) {
        message = err.errors[0].message;
    }
    else if (err instanceof Error) {
        message = err.message;
    }
    res.status(statusCode).json({ status, message });
};
exports.default = errorController;
