import { getDeviceId, getDeviceSize } from "@/lib/getDeviceInfo";
import { loginVerifyRoute } from "@/constants/api";
import { BackendVerifyLogin, PasskeyVerify } from "@/schemas/login.schema";
import { loginIdentifySuccessResponse } from "@/types/auth/login/loginIdenfity.type";
import { loginVerifyResponse } from "@/types/auth/login/loginVerify.type";
import { LoginMethod } from "@/types/auth/login/login.type";

export type AuthLogin = {
  isSuccess: boolean;
  data?: {
    name: string;
    email: string;
    picture: string;
  } | null;
  result?: loginVerifyResponse;
  error?: Error;
};

type verifyLoginProps = {
  loginIdentify: loginIdentifySuccessResponse | null;
  method: LoginMethod;
  code: string | PasskeyVerify;
};

export const verifyLogin = async ({
  loginIdentify,
  method,
  code,
}: verifyLoginProps): Promise<AuthLogin> => {
  if (!loginIdentify || loginIdentify?.action === "AUTO_LOGIN")
    return {
      isSuccess: false,
    };

  try {
    const common = {
      risk: loginIdentify.risk,
      remember: true,
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

    const res = await fetch(loginVerifyRoute, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.log(await res.json());
      throw new Error("Verification failed");
    }

    const result: loginVerifyResponse = await res.json();

    return {
      isSuccess: result.success,
      data: result.data,
      result,
    };
  } catch (err) {
    console.log(err);
    return {
      isSuccess: false,
      error: err instanceof Error ? err : new Error("Unknown error"),
    };
  }
};
