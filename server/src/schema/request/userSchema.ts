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

export const signInInput = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required.",
      })
      .email("Please provide a valid email."),
    password: z.string({
      required_error: "Please provide a passwword.",
    }),
  }),
});

export type SignInInput = z.infer<typeof signInInput>;

export const searchUsersSchema = z.object({
  query: z.object({
    text: z
      .string({
        required_error: "Please provided the search text.",
      })
      .min(1, { message: "Search text can not be empty." }),
    limit: z.string().min(1).max(100).optional(),
    page: z.string().optional(),
  }),
});

export type SearchUserSchema = z.infer<typeof searchUsersSchema>;
