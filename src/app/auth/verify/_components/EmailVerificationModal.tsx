"use client";

import { googleSans, googleSansFlex } from "@/assets/fonts/font.google";
import LogoMark from "@/components/brand/LogoMark";
import { apiUrl, routes } from "@/constants/api";
import { getSocket } from "@/lib/socket";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type EmailVerificationModalProps = {
    show: boolean;
    sentMail: string;
    className?: string;
};

const EmailVerificationModal = ({
    className,
    show,
    sentMail,
}: EmailVerificationModalProps) => {
    const router = useRouter();

    const [resending, setResending] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const redirectingRef = useRef(false);
    const webSocketVerified = useRef(false);

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
        if (!show) return;

        const channel = new BroadcastChannel("signup-status");

        const handleStatus = (event: MessageEvent) => {
            if (!webSocketVerified.current) return;
            if (redirectingRef.current) return;

            const status = event.data?.status;

            redirectingRef.current = true;

            channel.close();

            if (status === "VERIFIED") {
                router.replace("/dashboard");
            } else {
                router.replace("/auth/login");
            }
        };

        channel.onmessage = handleStatus;

        return () => {
            channel.close();
        };
    }, [show, router]);

    useEffect(() => {
        if (!show || !sentMail) return;

        const normalizedEmail = sentMail.trim().toLowerCase();

        webSocketVerified.current = false;

        const socket = getSocket(
            `/auth?type=verification&email=${encodeURIComponent(normalizedEmail)}`,
        );

        const handleVerified = (data: { emailId?: string }) => {
            const verifiedEmail = data?.emailId
                ?.trim()
                .toLowerCase();

            if (
                verifiedEmail &&
                verifiedEmail !== normalizedEmail
            ) {
                return;
            }

            webSocketVerified.current = true;

            socket.off("email:verified", handleVerified);
        };

        socket.on("email:verified", handleVerified);

        if (!socket.connected) {
            socket.connect();
        }

        return () => {
            socket.off("email:verified", handleVerified);
        };
    }, [show, sentMail]);

    useEffect(() => {
        if (show) {
            startCooldown();
        } else {
            clearTimer();
            setResendCooldown(0);
            webSocketVerified.current = false;
            redirectingRef.current = false;
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
        } catch {
        } finally {
            setResending(false);
        }
    };

    return (
        <main
            className={
                show
                    ? `
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                        bg-black/20
                        px-4
                        backdrop-blur-[1px]
                        ${className ?? ""}
                    `
                    : "hidden"
            }
        >
            <div
                className="
                    relative
                    box-border
                    flex
                    min-h-105
                    max-h-[90dvh]
                    w-full
                    max-w-105
                    min-w-0
                    flex-col
                    items-center
                    rounded-xl
                    border
                    border-border-secondary
                    bg-background
                    px-5
                    pb-5
                    pt-7
                    sm:px-6
                "
            >
                <LogoMark
                    monoChrome={true}
                    className="h-8"
                />

                <h1
                    className={`
                        ${googleSansFlex.className}
                        mt-5
                        text-xl
                        font-bold
                        tracking-tight
                    `}
                >
                    Verify your email
                </h1>

                <div
                    className={`
                        ${googleSans.className}
                        mt-2
                        text-center
                        text-sm
                        leading-5
                    `}
                >
                    <p className="text-muted-foreground">
                        We've sent a verification link to
                    </p>

                    <p className="mt-0.5 break-all font-medium text-foreground">
                        {sentMail}
                    </p>
                </div>

                <p
                    className={`
                        ${googleSans.className}
                        mt-8
                        text-sm
                        text-muted-foreground
                    `}
                >
                    Don't see a link?{" "}
                    <button
                        type="button"
                        onClick={resend}
                        disabled={
                            resending ||
                            resendCooldown > 0
                        }
                        className="
                            underline
                            underline-offset-2
                            transition-opacity
                            hover:opacity-70
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {resending
                            ? "Sending..."
                            : resendCooldown > 0
                                ? `Resend (${resendCooldown}s)`
                                : "Resend"}
                    </button>
                </p>

                <div className="flex-1" />

                <Link
                    href="/auth/login"
                    className={`
                        ${googleSans.className}
                        flex
                        h-10
                        w-full
                        shrink-0
                        items-center
                        justify-center
                        rounded-md
                        border
                        border-border-secondary
                        bg-[#e8e8ed]
                        text-sm
                        font-medium
                        text-foreground
                        transition-colors
                        hover:bg-[#e1e1ed]
                        dark:bg-[#222224]
                        dark:hover:bg-[#29292b]
                    `}
                >
                    Back to login
                </Link>

                <p
                    className={`
                        ${googleSans.className}
                        mt-4
                        text-center
                        text-[11px]
                        leading-4
                        text-muted-foreground
                    `}
                >
                    By continuing, you agree to our{" "}
                    <Link
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                    >
                        Terms of Service
                    </Link>{" "}
                    <span>•</span>{" "}
                    <Link
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                    >
                        Privacy Policy
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default EmailVerificationModal;