"use client";

import LogoHorizontal from "@/components/brand/LogoHorizontal";
import ErrorContent from "@/components/shared/ErrorContent";
import { ArrowLeft } from "lucide-react";
import IconTextButton from "@/components/shared/IconTextButton";
import HeroSection from "@/components/shared/NotFound/HeroScene";

const NotFound = () => {
  return (
    <div className="dark relative min-h-screen w-full overflow-hidden bg-black text-white">
      <div className="absolute top-8 left-5 z-10 flex w-full items-center justify-between px-0 lg:px-10">
        <LogoHorizontal
          logoMonoChrome
          workMarkMonoChrome
          className="opacity-90"
        />
      </div>

      <main className="flex min-h-screen flex-col items-center justify-center px-5 pb-5 pt-12 lg:-mt-2 lg:pl-5 lg:pr-3 lg:pt-0">
        <div className="flex w-full max-w-5xl flex-col items-center">
          <HeroSection />

          <ErrorContent
            name="Looks like you're lost."
            message="The page you're looking for doesn't exist or has been moved."
            description="Don't worry, you can find your way back home."
          />

          <IconTextButton
            text="Back to Home"
            icon={ArrowLeft}
            className="mt-7 h-12 w-50 text-[16px]"
            href="/"
          />
        </div>
      </main>
    </div>
  );
};
export default NotFound;