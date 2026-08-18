"use client";

import IdentifyFormSection from "@/app/(auth)/login/_components/IdentifyFormSection";
import { useLoginStore } from "@/store/login.store";
import VerifyIdentitySection from "@/app/(auth)/login/_components/VerifyIdentitySection";
import { useTheme } from "next-themes";


const LoginPage = () => {
  const step = useLoginStore((state) => state.step);
  const hasHydrated = useLoginStore((state) => state._hasHydrated);

  if (!hasHydrated) return null;


  return (
    <main className=" min-h-dvh bg-background">
        {step === 1 ? <IdentifyFormSection /> : <VerifyIdentitySection />}
    </main>
  );
};

export default LoginPage;