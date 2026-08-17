"use client"

import { googleSans, googleSansFlex } from "@/assets/fonts/font.google"
import LogoMark from "@/components/brand/LogoMark"
import { apiUrl, routes } from "@/constants/api"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"

type EmailVerificationModalProps = {
    show: boolean
    sentMail: string
    className?: string
}

const EmailVerificationModal = ({ className, show, sentMail }: EmailVerificationModalProps) => {
    const [resending, setResending] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const clearTimer = useCallback(() => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const startCooldown = useCallback(() => {
        clearTimer();
        setResendCooldown(30);
        intervalRef.current = setInterval(() => {
            setResendCooldown((prev) => {
                if (prev <= 1) {
                    clearTimer();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, [clearTimer]);

    useEffect(() => {
        if (show) {
            startCooldown();
        } else {
            clearTimer();
            setResendCooldown(0);
        }
        return clearTimer;
    }, [show, startCooldown, clearTimer]);

    const resend = async () => {
        if (resending || resendCooldown > 0) return;

        setResending(true);

        try {
            const response = await fetch(
                apiUrl(routes.resendEmailVerification),
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: sentMail,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message || "Failed to resend verification email"
                );
            }

            startCooldown();
        } finally {
            setResending(false);
        }
    };

    return (
        <main
            className={
                show
                    ? `fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px] ${className ?? ""
                    }`
                    : "hidden"
            }
        >
            <div className="relative box-border flex h-[50%] w-[28%] min-w-[320px] flex-col items-center rounded-xl border border-border-secondary bg-background px-4 pb-5 pt-7">

                {/* Logo */}
                <LogoMark
                    monoChrome={true}
                    className="h-8"
                />

                {/* Heading */}
                <h1
                    className={`mt-5 text-xl font-bold ${googleSansFlex.className}`}
                >
                    Verify your email
                </h1>

                {/* Email message */}
                <div
                    className={`mt-2 text-center text-sm leading-5 ${googleSans.className}`}
                >
                    <p className="text-muted-foreground">
                        We've sent a verification link to
                    </p>

                    <p className="font-medium text-foreground">
                        {sentMail}
                    </p>
                </div>

                {/* Resend */}
                <p
                    className={`mt-8 text-sm text-muted-foreground ${googleSans.className}`}
                >
                    Don't see a link?{" "}
                    <button
                        type="button"
                        onClick={resend}
                        disabled={resending || resendCooldown > 0}
                        className="underline underline-offset-2 transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {resending
                            ? "Sending..."
                            : resendCooldown > 0
                                ? `Resend (${resendCooldown}s)`
                                : "Resend"}
                    </button>
                </p>

                {/* Flexible space */}
                <div className="flex-1" />

                {/* Back button */}
                <Link
                    href="/login"
                    className={`flex h-10 w-full shrink-0 items-center justify-center rounded-md border border-border-secondary bg-[#e8e8ed] dark:bg-[#222224] text-sm font-medium text-foreground transition-colors hover:bg-[#e1e1ed] dark:hover:bg-[#29292b] ${googleSans.className}`}
                >
                    Back to login
                </Link>

                {/* Terms */}
                <p
                    className={`mt-4 text-center text-[11px] leading-4 text-muted-foreground ${googleSans.className}`}
                >
                    By continuing, you agree to our{" "}
                    <Link
                        href="/terms"
                        className="underline underline-offset-2"
                    >
                        Terms of Service
                    </Link>{" "}
                    <span>•</span>{" "}
                    <Link
                        href="/privacy"
                        className="underline underline-offset-2"
                    >
                        Privacy Policy
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default EmailVerificationModal