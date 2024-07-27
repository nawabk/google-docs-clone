"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUsersSchema = exports.signInInput = exports.resendTokenInput = exports.verifyUserInput = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z
        .object({
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
            required_error: "Password Confirm is required.",
        }),
    })
        .refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords do not match",
        path: ["passwordConfirm"],
    }),
});
const userParamsBase = zod_1.z.object({
    params: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: "Please provide user id to verify.",
        }),
    }),
});
exports.verifyUserInput = zod_1.z
    .object({
    body: zod_1.z.object({
        token: zod_1.z.string({
            required_error: "Please provide token to verify.",
        }),
    }),
})
    .merge(userParamsBase);
exports.resendTokenInput = userParamsBase;
exports.signInInput = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "Email is required.",
        })
            .email("Please provide a valid email."),
        password: zod_1.z.string({
            required_error: "Please provide a passwword.",
        }),
    }),
});
exports.searchUsersSchema = zod_1.z.object({
    query: zod_1.z.object({
        text: zod_1.z.string({
            required_error: "Please provided the search text.",
        }),
        limit: zod_1.z.string().optional(),
        page: zod_1.z.string().optional(),
    }),
});
