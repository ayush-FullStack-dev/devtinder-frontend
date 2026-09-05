import Header from "@/components/shared/Header";
import CircleLoader from "@/components/shared/Loader/CircleLoader";
import { googleSans, googleSansFlex } from "@/assets/fonts/font.google";

import { loginMethodDetails } from "@/constants/login";
import { useLoginStore } from "@/store/login.store";
import {
  startAuthentication,
  type AuthenticationResponseJSON,
  type PublicKeyCredentialRequestOptionsJSON,
} from "@simplewebauthn/browser";
import { useEffect, useState } from "react";
import InputError from "@/components/shared/InputError";
import { PasskeyVerify } from "@/schemas/login.schema";
import useVerifyLogin from "@/hooks/useVerifyLogin";
import AppLoader from "@/components/shared/Loader/AppLoader";

type VeridyPasskeyError = {
  name: string;
  message: string;
};

type PasskeyContentProps = {
  navigateFn?: () => void;
  onResponseResolve?: (
    isSuccess: boolean,
    setIsFetching: (state: boolean) => void,
  ) => void;
};
const PasskeyContent = ({
  navigateFn = () => undefined,
  onResponseResolve = () => undefined,
}: PasskeyContentProps) => {
  const hasHydrated = useLoginStore((state) => state._hasHydrated);
  if (!hasHydrated) return null;

  const options = useLoginStore((state) => state.loginIdentifyInfo?.passkey);
  const loginStore = useLoginStore((state) => state);

  const [passkeyResponse, setPasskeyResponse] = useState<
    AuthenticationResponseJSON | null | PasskeyVerify
  >(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<VeridyPasskeyError | null>(null);

  const loaderStyle = {
    "--size": "1px",
  };

  const verify = async (options: PublicKeyCredentialRequestOptionsJSON) => {
    try {
      const response = await startAuthentication({
        optionsJSON: options,
      });

      setPasskeyResponse(response);
    } catch (err) {
      if (err instanceof DOMException) {
        setError({
          name: err.name,
          message: err.message,
        });
        return;
      }

      if (err instanceof Error) {
        if (err.name === "AbortError") {
          return;
        } else if (err.name === "NotAllowedError") {
          return setError({
            name: "AuthenticationFailed",
            message: "Couldn't verify your passkey. Please try again.",
          });
        }

        setError({
          name: err.name,
          message: err.message,
        });
        return;
      }

      setError({
        name: "UnknownError",
        message: "Something went wrong",
      });
    }
  };

  const authenticatePasskey = (skipErrorCheck: boolean = true) => {
    if (!skipErrorCheck && !error) {
      return;
    }

    if (!options) {
      navigateFn();
      return;
    }

    setError(null);
    verify(options);
  };

  useEffect(() => authenticatePasskey(), [options]);

  useEffect(() => {
    if (!passkeyResponse) {
      return;
    }

    setIsFetching(true);
  }, [passkeyResponse]);

  try {
    const {
      isSuccess: success,
      error,
      data,
    } = useVerifyLogin({
      loginStore,
      method: "passkey",
      code: (passkeyResponse as PasskeyVerify | null) ?? "",
      onResponseResolve: (isSuccess) => {
        onResponseResolve(isSuccess, setIsFetching);
      },
      action: "REQUIRED_METHOD",
    });

    if (error) {
      setError({
        name: "UnknownError",
        message: error.message,
      });
    }
  } catch (err: any) {
    setError({
      name: "UnknownError",
      message: "Something went wrong",
    });
  }

  return (
    <div className="relative flex flex-col min-h-110  gap-3 mt-5 mb-4 ml-2 mr-2  md:ml-0 md:mr-0">
      <AppLoader loading={isFetching} />

      <Header
        title="Verify With Passkey"
        description="Use your passkey to securley sign in to your account."
      />

      <div className="h-62 min-h-40 max-h-70 w-full rounded-xl  outline-1 outline-primary/40 flex flex-col items-center justify-between p-5 m-auto">
        <div
          className="
    flex h-auto w-auto items-center justify-center rounded-full border-2 mb-2
    border-primary/15 bg-primary/5
    p-4
    dark:border-primary/25 dark:bg-primary/10
    cursor-pointer
  "
          onClick={() => authenticatePasskey(true)}
        >
          <loginMethodDetails.passkey.icon
            className="text-primary"
            size={40}
          />
        </div>

        <div className="inline-flex flex-col justify-between gap-1">
          <h1
            className={`text-xl tracking-wide font-heading ${googleSansFlex.className} text-center`}
          >
            Use your device to continue
          </h1>

          <p
            className={`text-foreground-muted ${googleSans.className} tracking-wide font-bold text-[13px] text-center text-balance`}
          >
            Touch your fingerprint, face, or use your security key.
          </p>
        </div>

        {error ? (
          <InputError text={error.message} />
        ) : (
          <span className="flex items-center justify-center gap-4 text-primary mt-3">
            <CircleLoader loaderStyle={loaderStyle} />
            <p className={`${googleSans.className} font-heading tracking-wide`}>
              Waiting for authentication...
            </p>
          </span>
        )}
      </div>
    </div>
  );
};

export default PasskeyContent;
