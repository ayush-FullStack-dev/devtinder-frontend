import { getDeviceId, getDeviceSize } from "@/lib/getDeviceInfo";
import { apiUrl, routes } from "@/constants/api";
import { BackendVerifyLogin } from "@/schemas/login.schema";
import { loginIdentifySuccessResponse } from "@/types/auth/login/loginIdenfity.type";
import { loginVerifyResponse } from "@/types/auth/login/loginVerify.type";
import { AuthLogin } from "@/services/login/verifyLogin";

export const verifyAutoLogin = async (
  loginIdentify: loginIdentifySuccessResponse | null,
): Promise<AuthLogin> => {
  if (loginIdentify?.action !== "AUTO_LOGIN")
    return {
      isSuccess: false,
    };

  try {
    const body: BackendVerifyLogin = {
      method: "trusted_session",
      risk: loginIdentify.risk,
      code: undefined,
      remember: true,
      deviceId: getDeviceId(localStorage),
      deviceSize: getDeviceSize(localStorage, true),
      clientTimestamp: new Date(),
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
      result,
    };
  } catch (err) {
    return {
      isSuccess: false,
      error: err instanceof Error ? err : new Error("Unknown error"),
    };
  }
};
