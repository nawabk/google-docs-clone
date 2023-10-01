import { z } from "zod";

export const createUserSchema = z
  .object({
    body: z.object({
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
        required_error: "Password Confirmation is required.",
      }),
    }),
  })
  .refine((val) => val.body.password === val.body.passwordConfirm, {
    message: "Password Confirm does not match with password.",
  });

export type CreateUserSchema = z.infer<typeof createUserSchema>;
