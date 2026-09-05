"use client";

import { googleSans } from "@/assets/fonts/font.google";
import LogoHorizontal from "@/components/brand/LogoHorizontal";
import { apiUrl, routes } from "@/constants/api";
import {
    AlertCircle,
    CircleCheck,
    CircleX,
    Loader2,
    MoveRight,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import VerifyRedirect from "./VerifyRedirect";

type VerifyStatus = "success" | "invalid" | "expired" | "error";

type VerifyPageContentProps = {
    status: VerifyStatus;
    email: string;
};

function VerifyPageContent({
    status,
    email,
}: VerifyPageContentProps) {
    const isSuccess = status === "success";
    const isExpired = status === "expired";

    const [resending, setResending] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const [resendError, setResendError] = useState("");

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
        return clearTimer;
    }, [clearTimer]);

    const resend = async () => {
        if (
            resending ||
            resendCooldown > 0 ||
            !email.trim()
        ) {
            return;
        }

        setResending(true);
        setResendError("");

        try {
            const response = await fetch(
                apiUrl(routes.resendEmailVerification),
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email.trim(),
                    }),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                        "Failed to resend verification email",
                );
            }

            startCooldown();
        } catch (error) {
            setResendError(
                error instanceof Error
                    ? error.message
                    : "Failed to resend verification email",
            );
        } finally {
            setResending(false);
        }
    };

    return (
        <main
            className={`
                ${googleSans.className}
                min-h-dvh
                px-5
                py-6
                sm:px-8
                sm:py-7
                lg:px-10
            `}
        >
            <LogoHorizontal
                monoChrome={true}
                className="mb-5 sm:mb-6"
            />

            <div
                className="
                    mx-auto
                    flex
                    min-h-[calc(100dvh-104px)]
                    w-full
                    max-w-lg
                    flex-col
                    items-center
                    justify-center
                    text-center
                "
            >
                <div className="flex w-full flex-col items-center">
                    {status === "success" && (
                        <CircleCheck
                            size={88}
                            strokeWidth={1.15}
                            className="mb-6 text-emerald-500"
                        />
                    )}

                    {status === "invalid" && (
                        <CircleX
                            size={88}
                            strokeWidth={1.15}
                            className="mb-6 text-red-500"
                        />
                    )}

                    {status === "expired" && (
                        <AlertCircle
                            size={88}
                            strokeWidth={1.15}
                            className="mb-6 text-amber-500"
                        />
                    )}

                    {status === "error" && (
                        <CircleX
                            size={88}
                            strokeWidth={1.15}
                            className="mb-6 text-red-500"
                        />
                    )}

                    <h1
                        className="
                            max-w-[620px]
                            text-4xl
                            font-bold
                            leading-[1.08]
                            tracking-[-0.035em]
                            text-foreground
                            sm:text-[46px]
                            sm:leading-[1.05]
                        "
                    >
                        {status === "success" && "Email verified"}
                        {status === "invalid" && "Invalid verification link"}
                        {status === "expired" && "Verification link expired"}
                        {status === "error" && "Something went wrong"}
                    </h1>

                    <p
                        className="
                            mt-5
                            max-w-[470px]
                            px-2
                            text-base
                            leading-7
                            tracking-[-0.01em]
                            text-muted-foreground
                            sm:mt-6
                            sm:text-[17px]
                            sm:leading-7
                        "
                    >
                        {status === "success" && (
                            <>
                                Your email has been successfully verified.
                                You can now explore DevTinder and start
                                connecting with developers.
                            </>
                        )}

                        {status === "invalid" && (
                            <>
                                This verification link is invalid or the
                                verification token is missing. Please check
                                your email and use the original verification
                                link.
                            </>
                        )}

                        {status === "expired" && (
                            <>
                                This verification link has expired or is no
                                longer valid. Request a new verification email
                                to continue.
                            </>
                        )}

                        {status === "error" && (
                            <>
                                We couldn't verify your email right now.
                                Please try again later.
                            </>
                        )}
                    </p>
                </div>

                <div
                    className="
                        mt-9
                        flex
                        w-full
                        flex-col
                        items-center
                        gap-3
                        sm:mt-10
                        sm:gap-4
                    "
                >
                    {isSuccess ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="
                                    flex
                                    h-[52px]
                                    w-full
                                    max-w-md
                                    items-center
                                    rounded-xl
                                    bg-[#27272f]
                                    px-5
                                    text-[15px]
                                    font-semibold
                                    tracking-[-0.01em]
                                    text-white
                                    shadow-sm
                                    transition-all
                                    hover:opacity-90
                                    active:scale-[0.99]
                                    dark:bg-[#f4f4f5]
                                    dark:text-[#161617]
                                    sm:h-14
                                    sm:text-base
                                "
                            >
                                <span className="mx-auto">
                                    Go to Dashboard
                                </span>

                                <MoveRight
                                    size={20}
                                    strokeWidth={1.8}
                                    className="shrink-0"
                                />
                            </Link>

                            <Link
                                href="/"
                                className="
                                    flex
                                    min-h-11
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-lg
                                    px-4
                                    py-2
                                    text-sm
                                    font-medium
                                    tracking-[-0.01em]
                                    text-muted-foreground
                                    transition-colors
                                    hover:text-foreground
                                "
                            >
                                <span>Explore DevTinder</span>

                                <MoveRight
                                    size={17}
                                    strokeWidth={1.8}
                                    className="shrink-0"
                                />
                            </Link>
                        </>
                    ) : isExpired ? (
                        <>
                            <button
                                type="button"
                                onClick={resend}
                                disabled={
                                    resending ||
                                    resendCooldown > 0 ||
                                    !email.trim()
                                }
                                className="
                                    flex
                                    h-[52px]
                                    w-full
                                    max-w-md
                                    items-center
                                    rounded-xl
                                    bg-[#27272f]
                                    px-5
                                    text-[15px]
                                    font-semibold
                                    tracking-[-0.01em]
                                    text-white
                                    shadow-sm
                                    transition-all
                                    hover:opacity-90
                                    active:scale-[0.99]
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                    dark:bg-[#f4f4f5]
                                    dark:text-[#161617]
                                    sm:h-14
                                    sm:text-base
                                "
                            >
                                <span className="mx-auto">
                                    {resending
                                        ? "Sending..."
                                        : resendCooldown > 0
                                          ? `Resend in ${resendCooldown}s`
                                          : "Resend Verification Email"}
                                </span>

                                {resending ? (
                                    <Loader2
                                        size={20}
                                        strokeWidth={1.8}
                                        className="shrink-0 animate-spin"
                                    />
                                ) : (
                                    <MoveRight
                                        size={20}
                                        strokeWidth={1.8}
                                        className="shrink-0"
                                    />
                                )}
                            </button>

                            {resendError && (
                                <p
                                    className="
                                        max-w-md
                                        px-2
                                        text-sm
                                        leading-5
                                        text-red-500
                                    "
                                >
                                    {resendError}
                                </p>
                            )}

                            <Link
                                href="/auth/login"
                                className="
                                    flex
                                    min-h-11
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-lg
                                    px-4
                                    py-2
                                    text-sm
                                    font-medium
                                    tracking-[-0.01em]
                                    text-muted-foreground
                                    transition-colors
                                    hover:text-foreground
                                "
                            >
                                <span>Back to Login</span>

                                <MoveRight
                                    size={17}
                                    strokeWidth={1.8}
                                    className="shrink-0"
                                />
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/auth/login"
                                className="
                                    flex
                                    h-[52px]
                                    w-full
                                    max-w-md
                                    items-center
                                    rounded-xl
                                    bg-[#27272f]
                                    px-5
                                    text-[15px]
                                    font-semibold
                                    tracking-[-0.01em]
                                    text-white
                                    shadow-sm
                                    transition-all
                                    hover:opacity-90
                                    active:scale-[0.99]
                                    dark:bg-[#f4f4f5]
                                    dark:text-[#161617]
                                    sm:h-14
                                    sm:text-base
                                "
                            >
                                <span className="mx-auto">
                                    Back to Login
                                </span>

                                <MoveRight
                                    size={20}
                                    strokeWidth={1.8}
                                    className="shrink-0"
                                />
                            </Link>

                            <Link
                                href="/"
                                className="
                                    flex
                                    min-h-11
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-lg
                                    px-4
                                    py-2
                                    text-sm
                                    font-medium
                                    tracking-[-0.01em]
                                    text-muted-foreground
                                    transition-colors
                                    hover:text-foreground
                                "
                            >
                                <span>Explore DevTinder</span>

                                <MoveRight
                                    size={17}
                                    strokeWidth={1.8}
                                    className="shrink-0"
                                />
                            </Link>
                        </>
                    )}
                </div>

                {isSuccess && <VerifyRedirect delay={5000} />}
            </div>
        </main>
    );
}

export default VerifyPageContent;