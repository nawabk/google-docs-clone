import { z } from "zod";

export const createUserSchema = z.object({
  body: z
    .object({
      username: z.string({
        required_error: "Username is required.",
      }),
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Please provide a valid email."),
      password: z
        .string({
          required_error: "Password is required.",
        })
        .min(6, "Password length should be 6."),
      passwordConfirm: z.string({
        required_error: "Password Confirm is required.",
      }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    }),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;

const userParamsBase = z.object({
  params: z.object({
    userId: z.string({
      required_error: "Please provide user id to verify.",
    }),
  }),
});

export const verifyUserInput = z
  .object({
    body: z.object({
      token: z.string({
        required_error: "Please provide token to verify.",
      }),
    }),
  })
  .merge(userParamsBase);

export type VerifyUserInput = z.infer<typeof verifyUserInput>;

export const resendTokenInput = userParamsBase;

export type ResendTokenInput = z.infer<typeof resendTokenInput>;
