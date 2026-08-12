"use client";

import LogoHorizontal from "@/components/brand/LogoHorizontal";
import ErrorContent from "@/components/shared/ErrorContent";
import IconTextButton from "@/components/shared/IconTextButton";
import { ArrowLeft, RefreshCcw } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const [message = "We couldn't complete request right now.", description = "Please try agin in moment."] = error?.message?.split(".") ?? [];

    return (
        <div className="dark bg-[#0e0f13] text-white min-h-screen w-full relative overflow-hidden">
            <div className="absolute top-7 left-10 w-full px-0 lg:px-10 flex items-center justify-between z-10">
                <LogoHorizontal
                    logoMonoChrome
                    workMarkMonoChrome
                    className="opacity-90"
                />

                <div className="hidden xs:inline">
                    <IconTextButton
                        text="Back to Home"
                        icon={ArrowLeft}
                        className="text-[var(--nav-link-dark)] bg-transparent border-none hover:text-[var(--nav-link-dark-hover)]
                    sm:bg-[#1a1a1a] w-50 h-12  text-sm sm:text-mid mr-10"
                        href="/"
                    />
                </div>

            </div>

            <div className="flex min-h-screen flex-col items-center justify-center">
                <img
                    alt="Disconnected"
                    src="/images/Disconnected.png"
                    className="w-130 h-auto opacity-85 select-none pointer-events-none"
                    draggable={false}
                    aria-hidden="true"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                />

                <ErrorContent
                    name={error?.name || "Something went wrong"}
                    message={message}
                    description={description}
                />

                <div className="flex flex-col gap-6 -mb-7">
                    <IconTextButton
                        text="Try Again"
                        icon={RefreshCcw}
                        className="w-50 h-12 text-[16px] mt-7"
                        onClick={reset}
                    />


                </div>
            </div>
        </div>
    );
}