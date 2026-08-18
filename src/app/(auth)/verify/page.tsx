import { googleSans } from "@/assets/fonts/font.google";
import LogoHorizontal from "@/components/brand/LogoHorizontal";
import {
    AlertCircle,
    CircleCheck,
    CircleX,
    MoveRight,
} from "lucide-react";
import Link from "next/link";
import VerifyRedirect from "./_components/VerifyRedirect";

type PageProps = {
    searchParams: Promise<{
        status?: string;
    }>;
};

type VerifyStatus = "success" | "invalid" | "expired" | "error";

async function VerifyPage({ searchParams }: PageProps) {
    const { status: queryStatus } = await searchParams;

    const status: VerifyStatus =
        queryStatus === "success" ||
        queryStatus === "invalid" ||
        queryStatus === "expired" ||
        queryStatus === "error"
            ? queryStatus
            : "error";

    const isSuccess = status === "success";

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
                {/* Status */}
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

                    {/* Heading */}
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

                    {/* Description */}
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
                                verification token is missing. Please request
                                a new verification email.
                            </>
                        )}

                        {status === "expired" && (
                            <>
                                This verification link has expired or is no
                                longer valid. Please request a new verification
                                email.
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

                {/* Actions */}
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
                    ) : (
                        <>
                            <Link
                                href="/login"
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
                                    Resend Verification Email
                                </span>

                                <MoveRight
                                    size={20}
                                    strokeWidth={1.8}
                                    className="shrink-0"
                                />
                            </Link>

                            <Link
                                href="/login"
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
                    )}
                </div>

                {/* Success redirect */}
                {isSuccess && <VerifyRedirect delay={5000} />}
            </div>
        </main>
    );
}

export default VerifyPage;