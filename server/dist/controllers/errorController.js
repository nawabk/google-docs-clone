"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorController = (err, _1, res, _2) => {
    const errorResponse = {
        statusCode: err.statusCode || 500,
        status: err.status || "error",
        message: err.message || "Something went wrong",
    };
    console.log(err);
    res.send(errorResponse);
};
exports.default = errorController;
