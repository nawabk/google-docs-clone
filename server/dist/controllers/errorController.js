"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../utils/appError"));
// import { MongooseError } from "mongoose";
const mongodb_1 = require("mongodb");
const hanldeDuplicateFieldsDB = (err) => {
    console.log(err.message);
    const valueArr = err.message.match(/email: '([^']+)'/);
    console.log(valueArr);
    let message = "Something went wrong", statusCode = 500;
    if (valueArr === null || valueArr === void 0 ? void 0 : valueArr.length) {
        const value = valueArr[1];
        message = `${value} already exist`;
        statusCode = 400;
    }
    return new appError_1.default(message, 400);
};
const errorController = (err, _1, res, _2) => {
    const errorResponse = {
        status: err.status || "error",
        message: err.message || "Something went wrong",
    };
    let statusCode = 500, status = "error", message = "Something went wrong";
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
    res.status(statusCode).json({ status, message });
};
exports.default = errorController;
