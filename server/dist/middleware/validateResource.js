"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResource = void 0;
const zod_1 = require("zod");
const validateResource = (schmea) => (req, res, next) => {
    try {
        schmea.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (e) {
        let errMessage;
        if (e instanceof zod_1.ZodError) {
            errMessage = e.errors[0].message;
        }
        else if (e instanceof Error) {
            errMessage = e.message;
        }
        else {
            errMessage = "Something went wrong";
        }
        res.status(400).json({ message: errMessage });
    }
};
exports.validateResource = validateResource;
