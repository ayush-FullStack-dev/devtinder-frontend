"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type VerifyRedirectProps = {
    delay?: number;
};

export default function VerifyRedirect({
    delay = 10000,
}: VerifyRedirectProps) {
    const router = useRouter();

    const totalSeconds = Math.ceil(delay / 1000);
    const [countdown, setCountdown] = useState(totalSeconds);
    const [showFallback, setShowFallback] = useState(false);

    useEffect(() => {
        const countdownTimer = setInterval(() => {
            setCountdown((current) => {
                if (current <= 1) {
                    clearInterval(countdownTimer);
                    return 0;
                }

                return current - 1;
            });
        }, 1000);

        const redirectTimer = setTimeout(() => {
            router.replace("/dashboard");

            setTimeout(() => {
                setShowFallback(true);
            }, 1500);
        }, delay);

        return () => {
            clearInterval(countdownTimer);
            clearTimeout(redirectTimer);
        };
    }, [router, delay]);

    return (
        <div className="mt-6 flex flex-col items-center gap-2">
            {!showFallback ? (
                <p className="px-2 text-xs leading-5 text-muted-foreground sm:px-0">
                    Redirecting to dashboard in{" "}
                    <span className="font-semibold text-foreground">
                        {countdown}
                    </span>{" "}
                    {countdown === 1 ? "second" : "seconds"}...
                </p>
            ) : (
                <p className="text-xs leading-5 text-muted-foreground">
                    Taking longer than expected.{" "}
                    <button
                        type="button"
                        onClick={() => router.replace("/dashboard")}
                        className="font-medium text-foreground underline underline-offset-2 transition-opacity hover:opacity-70"
                    >
                        Click here to continue
                    </button>
                    .
                </p>
            )}
        </div>
    );
}