"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        username: zod_1.z.string({
            required_error: "Username is required.",
        }),
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email("Please provide a valid email."),
        password: zod_1.z
            .string({
            required_error: "Password is required.",
        })
            .min(6, "Password length should be 6."),
        passwordConfirm: zod_1.z.string({
            required_error: "Password Confirmation is required.",
        }),
    }),
})
    .refine((val) => val.body.password === val.body.passwordConfirm, {
    message: "Password Confirm does not match with password.",
});
