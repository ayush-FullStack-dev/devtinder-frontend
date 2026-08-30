import { z } from "zod";

const signupBaseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(50, "Name must be at max 50 characters long"),

  email: z
    .email("Email is invalid or already taken")
    .trim()
    .max(60, "Email must be at max 60 characters long"),

  username: z
    .string()
    .trim()
    .min(1, "Username is required")
    .max(30, "Username must be at max 30 characters long")
    .regex(/^[a-zA-Z0-9_]+$/, "Username is invalid or already taken"),

  gender: z.enum(
    ["male", "female", "non-binary", "prefer-not-to-say"],
    "Please select your gender",
  ),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password must be at max 100 characters long")
    .regex(/[A-Z]/, "Password must include one uppercase letter")
    .regex(/[0-9]/, "Password must include one number")
    .regex(/[^A-Za-z0-9]/, "Password must include one special character"),

  confirmPassword: z.string().min(1, "Confirm password is required"),
});

export const signupStep1Schema = signupBaseSchema.pick({
  name: true,
  email: true,
  username: true,
  gender: true,
});

export const signupStep2Schema = signupBaseSchema
  .pick({
    password: true,
    confirmPassword: true,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signupSchema = signupBaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  },
);

export type SignupFormValues = z.infer<typeof signupSchema>;

export type SignupStep1Values = z.infer<typeof signupStep1Schema>;

export type SignupStep2Values = z.infer<typeof signupStep2Schema>;
