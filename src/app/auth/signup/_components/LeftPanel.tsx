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
    <div className="w-full lg:w-[45vw]">
      <div className="flex h-full flex-col justify-around px-2 md:px-5">

        <div className={`flex flex-col ${step === 1 ? "gap-8" : "gap-10"}`}>
          {step === 1 ?
            <LogoHorizontal monoChrome /> :
            <BackButton className="mr-auto" onClick={() => (setStep(1))} />
          }
          {step !== 1 ?
            <SignupProgress currentStep={step} finalStep={2} /> :
            null
          }

          <Header
            title={step === 1 ? "Create your account" : "Secure your account"}
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

        {step === 1 ? (
          <div
            className={`${googleSans.className} -mt-3 mx-auto font-light tracking-wide text-muted-foreground`}
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
          <TermNotice className="mx-auto -mb-2" linkClassName="text-[#168b60] hover:text-[#18a370]" />
        )}
      </div>
    </div>
  );
};

export default LeftPanel;