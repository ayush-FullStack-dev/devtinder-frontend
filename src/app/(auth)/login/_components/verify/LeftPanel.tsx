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
};

const LeftPanel = ({ onResponseResolve }: ResponseResolveProps) => {
  const hasHydrated = useLoginStore((state) => state._hasHydrated);
  if (!hasHydrated) return null;
  const setStep = useLoginStore((state) => state.setStep);
  const step = useLoginStore((state) => state.step);
  const router = useRouter();

  useEffect(() => {
    if (step !== 1) {
      router.replace("/login");
    }
  }, [step, router]);

  const loginIdentifyInfo = useLoginStore((state) => state.loginIdentifyInfo);

  const setLoginIdentifyInfo = useLoginStore(
    (state) => state.setLoginIdentifyInfo,
  );

  let loginVerfiyMethods: LoginMethod[] | null = null;

  if (loginIdentifyInfo?.allowedMethod) {
    loginVerfiyMethods = [...loginIdentifyInfo?.allowedMethod];
  }

  const [selectedMethod, setSelectedMethod] = useState(
    loginIdentifyInfo?.primaryMethod,
  );

  const [isMethodConfirmed, setIsMethodConfirmed] = useState(false);

  const navigate = () => {
    if (isMethodConfirmed) {
      setIsMethodConfirmed(false);
    } else {
      setLoginIdentifyInfo(null);
      setStep(1);
    }

    router.replace("/login");
  };

  return (
    <div
      className={`box-border gap-2  p-4 pt-8 pb-2 items-stretch inline-flex  h-[95vh] ${isMethodConfirmed ? "w-160" : "w-170"} flex-col rounded-xl
bg-white
    dark:bg-zinc-900
    border
    border-slate-200
    dark:border-zinc-800 shadow-lg dark:shadow-2xl dark:shadow-black/30`}
    >
      <span className="inline-flex flex-col box-border w-40 items-center gap-3 mb-5">
        <LogoHorizontal className="ml-5" />
        <BackButton
          className={isMethodConfirmed ? "hidden" : "-ml-18 "}
          onClick={navigate}
        />
      </span>

      <AuthStepper
        currentStep={step}
        steps={["Identify", "Verify"]}
        className="ml-30 -mt-5"
      />
      {!isMethodConfirmed ? (
        <VerifyMethodSelector
          selectedMethod={selectedMethod}
          setSelectedMethod={setSelectedMethod}
          loginVerfiyMethods={loginVerfiyMethods}
          loginIdentifyInfo={loginIdentifyInfo}
          setIsMethodConfirmed={setIsMethodConfirmed}
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
