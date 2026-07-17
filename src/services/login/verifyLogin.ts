import { getDeviceId, getDeviceSize } from "@/lib/getDeviceInfo";
import { apiUrl, routes } from "@/constants/api";
import { BackendVerifyLogin, PasskeyVerify } from "@/schemas/login.schema";
import { loginIdentifySuccessResponse } from "@/types/auth/login/loginIdenfity.type";
import {
  loginVerifyErrorResponse,
  loginVerifyResponse,
} from "@/types/auth/login/loginVerify.type";
import { LoginMethod } from "@/types/auth/login/login.type";

export type AuthLogin = {
  isSuccess: boolean;
  data?: {
    name: string;
    email: string;
    picture: string;
  } | null;
  result?: loginVerifyResponse;
  error?: Error | loginVerifyErrorResponse;
};

type verifyLoginProps = {
  loginIdentify: loginIdentifySuccessResponse | null;
  method: LoginMethod;
  code: string | PasskeyVerify;
  remember?: boolean;
};

export const verifyLogin = async ({
  loginIdentify,
  method,
  code,
  remember = true,
}: verifyLoginProps): Promise<AuthLogin> => {
  if (!loginIdentify)
    return {
      isSuccess: false,
    };

  try {
    const common = {
      risk: loginIdentify.risk,
      remember,
      deviceId: getDeviceId(localStorage),
      deviceSize: getDeviceSize(localStorage, true),
      clientTimestamp: new Date(),
    };

    const body: BackendVerifyLogin =
      method === "trusted_session" || method === "session_approval"
        ? {
            ...common,
            method,
            code: null,
          }
        : method === "passkey"
          ? {
              ...common,
              method: "passkey",
              code: code as PasskeyVerify,
            }
          : {
              ...common,
              method,
              code: code as string,
            };

    const res = await fetch(apiUrl(routes.loginVerify), {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result: loginVerifyResponse = await res.json();

    return {
      isSuccess: result.success,
      data: result.success ? result.data : null,
      error: result.success
        ? undefined
        : {
            success: false,
            message: result.message,
          },
      result,
    };
  } catch (err) {
    return {
      isSuccess: false,
      error: err instanceof Error ? err : new Error("Unknown error"),
    };
  }
};
