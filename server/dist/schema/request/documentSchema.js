"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shareDocumenSchema = exports.updateDocumentNameSchema = exports.getDocumentSchema = exports.createDocumentSchema = exports.documentIdParams = void 0;
const zod_1 = require("zod");
exports.documentIdParams = zod_1.z.object({
    params: zod_1.z.object({
        documentId: zod_1.z.string(),
    }),
});
exports.createDocumentSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: "Please provide userId!",
        }),
        name: zod_1.z.string().optional(),
    }),
});
exports.getDocumentSchema = zod_1.z.object({}).merge(exports.documentIdParams);
exports.updateDocumentNameSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
    }),
})
    .merge(exports.documentIdParams);
exports.shareDocumenSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        sharedWith: zod_1.z.array(zod_1.z.object({
            user: zod_1.z.string(),
            access: zod_1.z.enum(["Editor", "Viewer"]),
        })),
    }),
})
    .merge(exports.documentIdParams);
