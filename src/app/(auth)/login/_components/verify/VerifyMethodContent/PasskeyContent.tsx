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

type PasskeyError = {
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
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<PasskeyError | null>(null);
  const loginStore = useLoginStore((state) => state);
  const [passkeyResponse, setPasskeyResponse] = useState<
    AuthenticationResponseJSON | null | PasskeyVerify
  >(null);

  const options = useLoginStore((state) => state.loginIdentifyInfo?.passkey);

  const loaderStyle = {
    "--size": "1px",
  };

  const verify = async (options: PublicKeyCredentialRequestOptionsJSON) => {
    try {
      // const response = await startAuthentication({
      //   optionsJSON: options,
      // });

      const response: PasskeyVerify = {
        id: "AQLm8dX7bY2mP0KQx",
        rawId: "AQLm8dX7bY2mP0KQx",
        type: "public-key",
        response: {
          authenticatorData: "SZYN5YgOjGh0NBcPZHZgW4MGJQ8AAAAAAQ==",
          clientDataJSON:
            "eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoiYWJjMTIzIn0=",
          signature:
            "MEQCID5wS0n5VQ4v2J0uR2jY1Yxv9Q5rNQm7mA9vZ1n8L2YZAiB8P8Y3g9v0e3x8z4uQw2Wm8N6v1s5q3b4a1x2y3z4w5A==",
          userHandle: null,
        },
        clientExtensionResults: {},
        authenticatorAttachment: "platform",
      };

      setPasskeyResponse(response as PasskeyVerify);
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
    useVerifyLogin({
      loginStore,
      method: "passkey",
      code: (passkeyResponse as PasskeyVerify | null) ?? "",
      onResponseResolve: (isSuccess) => {
        onResponseResolve(isSuccess, setIsFetching);
      },
      action: "REQUIRED_METHOD",
    });
  } catch (err) {
    console.log(err);
  }

  return (
    <div className="flex flex-col gap-3">
      <AppLoader loading={isFetching} />
      <Header
        title="Verify With Passkey"
        description="Use your passkey to securley sign in to your account."
      />

      <div className="h-60 rounded-xl w-130  outline-1 outline-[#4940e3] flex flex-col items-center justify-between p-5 mt-2">
        {/* logo */}
        <div
          className="
    flex h-18 w-18 items-center justify-center rounded-full border-2 mb-2
    border-[#e4dcfb] bg-[#efe9fc]
    dark:border-[#28244b] dark:bg-transparent
  "
          onClick={() => authenticatePasskey(true)}
        >
          <loginMethodDetails.passkey.icon
            className="text-[#7746f2]"
            size={40}
          />
        </div>
        {/* header */}
        <div className={`inline-flex flex-col  justify-between gap-1`}>
          <h1
            className={`text-xl  tracking-wide font-heading ${googleSansFlex.className} ml-auto mr-auto `}
          >
            Use your device to continue
          </h1>
          <p
            className={`text-gray-400 ${googleSans.className} tracking-wide  font-bold text-[13px] whitespace-nowrap`}
          >
            Touch your fingerprint,face or use your securty key.
          </p>
        </div>

        {error ? (
          <InputError text={error.message} />
        ) : (
          <span className="flex items-center justify-center gap-4 text-[#7746f2] mt-3">
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
