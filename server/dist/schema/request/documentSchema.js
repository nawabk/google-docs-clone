"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocumentSchema = void 0;
const zod_1 = require("zod");
exports.createDocumentSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: "Please provide userId!",
        }),
        name: zod_1.z.string().optional(),
    }),
});
