import { PasskeyVerify } from "@/schemas/login.schema";
import { verifyAutoLogin } from "@/services/login/verifyAutoLogin";
import { verifyLogin, AuthLogin } from "@/services/login/verifyLogin";
import { UseLoginStoreType } from "@/store/login.store";
import { LoginMethod } from "@/types/auth/login/login.type";
import { useEffect, useState } from "react";

type useVerifyLoginProps = {
  loginStore: UseLoginStoreType;
  method: LoginMethod;
  code: string | PasskeyVerify;
  onResponseResolve: (isSuccess: boolean) => void;
  action: "AUTO_LOGIN" | "REQUIRED_METHOD";
};

const useVerifyLogin = ({
  loginStore,
  method,
  code,
  onResponseResolve,
  action,
}: useVerifyLoginProps): AuthLogin => {
  const loginIdentifyInfo = loginStore.loginIdentifyInfo;
  const [{ isSuccess, error, data, result }, setState] = useState<AuthLogin>({
    isSuccess: false,
    data: null,
  });

  useEffect(() => {
    if (!loginIdentifyInfo || !code) {
      return;
    }

    let isActive = true;

    const verify = async () => {
      const loginCode =
        method === "trusted_session" || method === "session_approval"
          ? ""
          : method === "password" || method === "security_code"
            ? (code as string)
            : (code as PasskeyVerify);

      if (action === "AUTO_LOGIN") {
        await verifyAutoLogin(loginIdentifyInfo);
      }

      const response = await verifyLogin({
        loginIdentify: loginIdentifyInfo,
        method,
        code: loginCode,
      });

      if (!isActive) {
        return;
      }

      onResponseResolve(response.isSuccess);

      setState({
        isSuccess: response.isSuccess,
        error: response.error,
        data: response.data,
        result: response.result,
      });
    };

    void verify();

    return () => {
      isActive = false;
    };
  }, [action,method,code]);

  return {
    isSuccess,
    error,
    data,
    result,
  };
};

export default useVerifyLogin;
