"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { clientApiUrl, routes } from "@/constants/api";
import { getDeviceId, getDeviceSize } from "@/lib/getDeviceInfo";
import VerifyPageContent from "./VerifyPageContent";

type VerificationResult = {
  status: "success" | "invalid" | "expired" | "error";
  email: string;
};

async function completeVerification(token: string): Promise<VerificationResult> {
  try {
    const deviceId = await getDeviceId(localStorage);
    const deviceSize = await getDeviceSize(localStorage);
    const response = await fetch(
      clientApiUrl(`${routes.signupVerify}?token=${encodeURIComponent(token)}`),
      {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        referrerPolicy: "no-referrer",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceId,
          deviceSize,
          clientTimestamp: new Date().toISOString(),
        }),
      },
    );
    const data = await response.json();

    if (response.ok && data.code === "LOGIN_SUCCESS") {
      return { status: "success", email: data.data?.email ?? "" };
    }

    return {
      status: response.status === 401 ? "expired"
        : response.status === 400 ? "invalid" : "error",
      email: "",
    };
  } catch {
    return { status: "error", email: "" };
  }
}

export default function CompleteVerification({ token }: { token: string }) {
  const [result, setResult] = useState<VerificationResult | null>(null);
  const pending = useRef<Promise<VerificationResult> | null>(null);

  useEffect(() => {
    let active = true;
    pending.current ??= completeVerification(token);
    pending.current.then((value) => {
      if (active) setResult(value);
    });
    return () => { active = false; };
  }, [token]);

  if (result) {
    return <VerifyPageContent status={result.status} email={result.email} />;
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4" role="status">
      <Loader2 className="animate-spin" aria-hidden="true" />
      <p>Verifying your email and signing you in…</p>
    </main>
  );
}
