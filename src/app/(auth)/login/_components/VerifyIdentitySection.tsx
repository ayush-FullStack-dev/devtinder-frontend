import LeftPanel from "@/app/(auth)/login/_components/verify/LeftPanel";
import RightPanel from "@/app/(auth)/login/_components/verify/RightPanel";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useLoginStore } from "@/store/login.store";
import AppLoader from "@/components/shared/Loader/AppLoader";
import { verifyAutoLogin } from "@/services/login/verifyAutoLogin";

const VerifyIdentitySection = () => {
  const router = useRouter();
  const hasHydrated = useLoginStore((state) => state._hasHydrated);
  const step = useLoginStore((state) => state.step);
  const loginIdentify = useLoginStore((state) => state.loginIdentifyInfo);
  const setStep = useLoginStore((state) => state.setStep);
  const setLoginIdentifyInfo = useLoginStore(
    (state) => state.setLoginIdentifyInfo,
  );
  const [isFetching, setIsFetching] = useState(false);

  const onResponseResolve = useCallback(
    (isSuccess: boolean, fetchState: (state: boolean) => void) => {
      if (isSuccess) {
        router.push("/dashboard");

        window.setTimeout(() => {
          fetchState(false);
          setLoginIdentifyInfo(null);
          setStep(1);
        }, 200);

        return;
      }

      fetchState(false);
    },
    [router, setLoginIdentifyInfo, setStep],
  );

  useEffect(() => {
    if (step !== 2) {
      router.replace("/login");
    }
  }, [router, step]);

  useEffect(() => {
    if (!hasHydrated || !loginIdentify || step !== 2) {
      return;
    }

    let isActive = true;
    const start = Date.now();
    setIsFetching(true);

    const verify = async () => {
      const { isSuccess } = await verifyAutoLogin(loginIdentify);

      if (!isActive) {
        return;
      }

      const elapsed = Date.now() - start;

      if (elapsed < 500) {
        window.setTimeout(
          () => onResponseResolve(isSuccess, setIsFetching),
          700,
        );
        return;
      }

      onResponseResolve(isSuccess, setIsFetching);
    };

    void verify();

    return () => {
      isActive = false;
    };
  }, [hasHydrated, loginIdentify, onResponseResolve, step]);

  if (!hasHydrated) {
    return null;
  }

  return (
    <main>
      <AppLoader loading={isFetching} />
      <div
        className="
    h-screen w-full
    overflow-hidden
    p-0 md:p-3 md:pl-20
    bg-slate-100 dark:bg-zinc-950
    flex
  "
      >
        <div className="relative">
          <div className="relative z-10">
            <LeftPanel onResponseResolve={onResponseResolve} />
          </div>

          <div className="absolute top-0 left-4/4 z-1">
            <RightPanel />
          </div>
        </div>
      </div>
    </main>
  );
};

export default VerifyIdentitySection;
