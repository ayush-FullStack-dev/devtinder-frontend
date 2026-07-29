"use client";

import AuthStepper from "@/components/shared/auth/AuthStepper";
import BackButton from "@/components/shared/BackButton";
import { useLoginStore } from "@/store/login.store";
import { useEffect, useState } from "react";
import { LoginMethod } from "@/types/auth/login/login.type";
import { useRouter } from "next/navigation";
import LogoHorizontal from "@/components/brand/LogoHorizontal";
import VerifyMethodSelector from "@/app/(auth)/login/_components/verify/VerifyMethodSelector";
import VerifyMethodContent from "@/app/(auth)/login/_components/verify/VerifyMethodContent/VerifyMethodContent";

type ResponseResolveProps = {
  onResponseResolve: (
    isSuccess: boolean,
    setIsFetching: (state: boolean) => void,
  ) => void;
  isTrusted: boolean;
};

const LeftPanel = ({ onResponseResolve, isTrusted }: ResponseResolveProps) => {
  const hasHydrated = useLoginStore((state) => state._hasHydrated);
  const setStep = useLoginStore((state) => state.setStep);
  const step = useLoginStore((state) => state.step);
  const loginIdentifyInfo = useLoginStore((state) => state.loginIdentifyInfo);
  const setLoginIdentifyInfo = useLoginStore((state) => state.setLoginIdentifyInfo);
  const router = useRouter();

  let loginVerfiyMethods: LoginMethod[] | null = null;
  if (loginIdentifyInfo?.allowedMethod) {
    loginVerfiyMethods = [...loginIdentifyInfo.allowedMethod];
  }

  const selectedInitVal =
    loginIdentifyInfo?.primaryMethod === "trusted_session"
      ? ("passkey" as LoginMethod)
      : loginIdentifyInfo?.primaryMethod;

  const [selectedMethod, setSelectedMethod] = useState(selectedInitVal);
  const [isMethodConfirmed, setIsMethodConfirmed] = useState(!isTrusted);

  useEffect(() => {
    if (step !== 1) {
      router.replace("/login");
    }
  }, [step, router]);

  const navigate = () => {
    const hasOnlyOneMethod = loginVerfiyMethods?.length
      ? loginVerfiyMethods.length <= 1
      : false;

    if (hasOnlyOneMethod && isMethodConfirmed) {
      return;
    }

    if (isMethodConfirmed) {
      setIsMethodConfirmed(false);
    } else {
      setLoginIdentifyInfo(null);
      setStep(1);
    }

    router.replace("/login");
  };

  if (!hasHydrated) return null;

  return (
    <div
      className={`
        box-border gap-3 items-stretch inline-flex  flex-col  rounded-none md:rounded-xl
      fixed
      top-0
      md:static
      md:p-5
  h-dvh overflow-hidden
  md:h-[96vh]
        w-screen
  md:w-[80vw]
  lg:w-[46vw]
bg-white
    dark:bg-zinc-900
    border
    border-slate-200
    dark:border-zinc-800 shadow-lg dark:shadow-2xl dark:shadow-black/30
    `}
    >
      <span>
        <BackButton
          className={isMethodConfirmed ? "hidden" : "mt-3 ml-3 md:ml-2 md:mt-2"}
          text="Back"
          onClick={navigate}
        />
      </span>

      <AuthStepper
        currentStep={step}
        steps={["Identify", "Verify"]}
        className="-mt-2 md:-mt-5"
      />

      {!isMethodConfirmed ? (
        <VerifyMethodSelector
          selectedMethod={selectedMethod}
          setSelectedMethod={setSelectedMethod}
          loginVerfiyMethods={loginVerfiyMethods}
          loginIdentifyInfo={loginIdentifyInfo}
          setIsMethodConfirmed={setIsMethodConfirmed}
          navigateFn={navigate}
        />
      ) : (
        <VerifyMethodContent
          selectedMethod={selectedMethod as LoginMethod}
          navigateFn={navigate}
          onResponseResolve={onResponseResolve}
        />
      )}
    </div>
  );
};

export default LeftPanel;
