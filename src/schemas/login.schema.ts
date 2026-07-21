import { z } from "zod";
import { baseClientInfo } from "@/schemas/client.schema";
import { emptyCode } from "@/schemas/schema";

// identify login --- IGNORE ---

export const loginIdentifySchema = z.object({
  identifier: z
    .string({
      message: "Email, username, or phone number is required",
    })
    .trim()
    .max(60, "Identifier must be at most 60 characters long")
    .min(1, "Identifier filed is required"),
});

export const backendLoginIdentifySchema =
  loginIdentifySchema.merge(baseClientInfo);

export type loginIdentfy = z.infer<typeof loginIdentifySchema>;
export type backendLoginIdentfy = z.infer<typeof backendLoginIdentifySchema>;

// verify login --- IGNORE ---

const baseVerifyLoginFields = {
  remember: z.boolean(),
};

export const verifyPasswordClientSchema = z.object({
  code: z.string().trim().min(6, "Password must be at least 6 characters"),
  ...baseVerifyLoginFields,
});

export const passkeyVerifySchema = z.object({
  id: z.string(),
  rawId: z.string(),
  type: z.literal("public-key"),
  response: z.object({
    authenticatorData: z.string(),
    clientDataJSON: z.string(),
    signature: z.string(),
    userHandle: z.string().nullable().optional(),
  }),
  clientExtensionResults: z.record(z.string(), z.unknown()),
  authenticatorAttachment: z.enum(["platform", "cross-platform"]).optional(),
});

export const loginCompleteSchema = z.discriminatedUnion("method", [
  z.object({
    method: z.literal("trusted_session"),
    code: emptyCode,
    ...baseVerifyLoginFields,
  }),

  z.object({
    method: z.literal("passkey"),
    code: passkeyVerifySchema,
    ...baseVerifyLoginFields,
  }),

  z.object({
    method: z.literal("password"),
    code: z.string().trim().min(6, "Password must be at least 6 characters"),
    ...baseVerifyLoginFields,
  }),

  z.object({
    method: z.literal("security_code"),
    code: z
      .string()
      .regex(/^[0-9a-f]{10}$/i, "Security code must be 10 character of hex"),
    ...baseVerifyLoginFields,
  }),

  z.object({
    method: z.literal("session_approval"),
    code: emptyCode,
    ...baseVerifyLoginFields,
  }),
]);

const extraBackendVerifyLoginSchema = z.object({
  risk: z.string(),
  ...baseClientInfo.shape,
});

export const backendVerifyLoginSchema = loginCompleteSchema.and(
  extraBackendVerifyLoginSchema,
);

export type LoginComplete = z.infer<typeof loginCompleteSchema>;

export type BackendVerifyLogin = z.infer<typeof backendVerifyLoginSchema>;
export type verifyPasswordClient = z.infer<typeof verifyPasswordClientSchema>;
export type PasskeyVerify = z.infer<typeof passkeyVerifySchema>;
