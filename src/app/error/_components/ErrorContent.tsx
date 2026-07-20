"use client";

import { useRouter, useSearchParams } from "next/navigation";
import LogoHorizontal from "@/components/brand/LogoHorizontal";
import IconTextButton from "@/components/shared/IconTextButton";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import ErrorContent from "@/components/shared/ErrorContent";

const ErrorPageContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const title = searchParams.get("title");
    const message = searchParams.get("message");
    const redirect = searchParams.get("redirect");

    const reset = () => {
        if (redirect) {
            router.replace(redirect);
            router.refresh();
            return;
        }

        router.back();
    };

    return (
        <div className="bg-[#0e0f13] text-white min-h-screen w-full relative overflow-hidden">
            <div className="absolute top-8 left-5 w-full px-10 flex items-center justify-between z-10">
                <LogoHorizontal
                    logoMonoChrome
                    workMarkMonoChrome
                    className="opacity-90"
                />

                <div className="hidden sm:block">
                    <IconTextButton
                        text="Back to Home"
                        icon={ArrowLeft}
                        className="text-white border-white w-50 h-12 text-[16px] mr-10"
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
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                />

                <ErrorContent
                    name={title || "Something went wrong"}
                    message={
                        message || "We couldn't complete request right now."
                    }
                    description="Please try again in a moment."
                />

                <div className="flex flex-col gap-6 -mb-7">
                    <IconTextButton
                        text="Try Again"
                        icon={RefreshCcw}
                        className="bg-white text-black border-white w-50 h-12 text-[16px] mt-7"
                        onClick={reset}
                    />

                    <div className="block sm:hidden">
                        <IconTextButton
                            text="Back to Home"
                            icon={ArrowLeft}
                            className="text-white border-white w-50 h-12 text-[16px]"
                            href="/"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPageContent;