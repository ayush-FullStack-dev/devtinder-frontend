"use client"

import LogoHorizontal from "@/components/brand/LogoHorizontal";
import SignupFormIdentifer from "./SignupFormIdentifer";
import Header from "@/components/shared/Header";
import { useState } from "react";
import Link from 'next/link';
import { googleSans } from '@/assets/fonts/font.google';
import TermNotice from "@/components/shared/auth/TermsNotice";
import SignupForm from "./SignupForm";
import BackButton from "@/components/shared/BackButton";
import SignupProgress from "./SignupProgress";

const LeftPanel = () => {
  type SignupData = {
    name: string;
    username: string;
    email: string;
    password?: string;
    gender: "male" | "female" | "non-binary" | "prefer-not-to-say" | undefined;
    confirmPassword?: string;
  };

  const [step, setStep] = useState<1 | 2>(1);

  const [signupData, setSignupData] = useState<SignupData>({
    name: "",
    username: "",
    email: "",
    gender: undefined,
  });


  return (
    <div className="w-full lg:w-[45vw] h-full min-h-dvh">
      <div className="relative flex h-full min-h-dvh flex-col px-2 md:px-4">

        <div className={`relative flex shrink-0  flex-col ${step === 1 ? "pt-5 gap-4" : "pt-3 gap-7"} w-full`}>
          {step === 1 ? (
            <LogoHorizontal monoChrome />
          ) : (
            <BackButton className="mr-auto" onClick={() => (setStep(1))} />
          )}

          {step !== 1 && (
            <SignupProgress currentStep={step} finalStep={2} />
          )}
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div
            className={`flex w-full flex-col ${step === 1 ? "gap-8" : "gap-10"
              }`}
          >
            <Header
              title={
                step === 1
                  ? "Create your account"
                  : "Secure your account"
              }
              description={
                step === 1
                  ? "Join DevTinder and connect with dev likes you."
                  : "Create a strong password to keep your account safe."
              }
              className="w-full min-w-30 max-w-68"
            />

            {step === 1 ? (
              <SignupFormIdentifer
                setStep={setStep}
                signupData={signupData}
                setSignupData={setSignupData}
              />
            ) : (
              <SignupForm
                setStep={setStep}
                setSignupData={setSignupData}
                signupData={signupData}
              />
            )}
          </div>
        </div>

        <div className="shrink-0 pb-5">
          {step === 1 ? (
            <div
              className={`${googleSans.className} text-center font-light tracking-wide text-muted-foreground`}
            >
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium tracking-tight text-green-dark hover:text-green-hover"
              >
                Log in
              </Link>
            </div>
          ) : (
            <TermNotice
              className="mx-auto mb-1"
              linkClassName="text-[#168b60] hover:text-[#18a370]"
            />
          )}
        </div>

      </div>
    </div>
  );
};

export default LeftPanel;