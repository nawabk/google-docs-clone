"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editDocumentSchema = exports.createDocumentSchema = void 0;
const zod_1 = require("zod");
exports.createDocumentSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: "Please provide userId!",
        }),
        name: zod_1.z.string().optional(),
    }),
});
exports.editDocumentSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string(),
    }),
    body: zod_1.z.object({
        content: zod_1.z.string(),
    }),
});
