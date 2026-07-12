import { allowedRisk, loginMethods } from "@/types/auth/login/login.type";
import { backendResponseType } from "@/types/backendResponse.type";
import { LoginMethod } from "@/types/auth/login/login.type";
import { type PublicKeyCredentialRequestOptionsJSON } from "@simplewebauthn/browser";

export type loginIdentifySuccessResponse = backendResponseType & {
  action: "AUTO_LOGIN" | "REQUIRED_METHOD";
  risk: (typeof allowedRisk)[number];
  allowedMethod: LoginMethod[];
  primaryMethod: (typeof loginMethods)[number];
  passkey?: PublicKeyCredentialRequestOptionsJSON;
};

export type loginIdentifyErrorResponse = backendResponseType & {
  code?: string;
};

export type loginIdentifyResponse =
  | loginIdentifySuccessResponse
  | loginIdentifyErrorResponse;
