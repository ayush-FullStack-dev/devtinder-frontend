import { loginMethods } from "@/types/auth/login/login.type";
import { mfaMethod } from "@/types/auth/mfa/mfa.type";


export type loginVerifySuccesResponse = {
  success: true;
  message: string;
  allowedMethod?: typeof mfaMethod;
  data: {
    name: string;
    email: string;
    picture: string;
  };
};

export type loginVerifyErrorResponse = {
  success: true;
  message: string;
  code?: string;
  methods?: typeof loginMethods;
  primaryMethod?: (typeof loginMethods)[number];
  error?: string;
};

export type loginVerifyResponse = loginVerifySuccesResponse &
  loginVerifyErrorResponse;
