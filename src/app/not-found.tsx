"use client";

import LogoHorizontal from "@/components/brand/LogoHorizontal";
import ErrorContent from "@/components/shared/ErrorContent";
import { ArrowLeft } from "lucide-react";
import IconTextButton from "@/components/shared/IconTextButton";
import HeroSection from "@/components/shared/NotFound/HeroScene";

const NotFound = () => {
  return (
    <div className="bg-black text-white min-h-screen w-full relative overflow-hidden">
      <div className="absolute top-8 left-0 w-full px-10 flex items-center justify-between z-10">
        <LogoHorizontal
          logoMonoChrome
          workMarkMonoChrome
          className="opacity-90"
        />

      </div>

      <div className="flex min-h-screen flex-col items-center justify-center -mt-2">
        <HeroSection className="" />

        <ErrorContent
          name="Looks like you're lost."
          message="The page you're looking for doesn't exist or has been moved."
          description="Don't worry, you can find your way back home."
        />

        <IconTextButton
          text="Back to Home"
          icon={ArrowLeft}
          className="bg-white text-black border-white w-50 h-12 text-[16px] mt-5"
          href="/"
        />
      </div>
    </div>
  );
};

export default NotFound;
